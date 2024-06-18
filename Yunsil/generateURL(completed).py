import json
import requests
import psycopg2
import xml.etree.ElementTree as ET

# Constants
CHUNK_SIZE = 50000  # Number of URLs per sitemap file (adjusted for easier testing)

def split_list(input_list, chunk_size):
    for i in range(0, len(input_list), chunk_size):
        yield input_list[i:i + chunk_size]

def generate_xml_sitemap(urls, file_prefix, base_url, index_file, start_index=1):
    for i, chunk in enumerate(split_list(urls, CHUNK_SIZE), start=start_index):
        file_name = f"{file_prefix}-{i}.xml"
        file_path = f"{base_url}/{file_name}"
        
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
            f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
            
            for url in chunk:
                f.write(f'  <url>\n    <loc>{url}</loc>\n  </url>\n')
            
            f.write('</urlset>')

        print(f"XML sitemap written to {file_name}")

        # Write to the index file as soon as each sitemap is generated
        index_file.write(f'  <sitemap>\n    <loc>{file_path}</loc>\n  </sitemap>\n')

def generate_sitemap_index(index_file_path):
    f = open(index_file_path, 'w', encoding='utf-8')
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    return f

def load_hs_codes(file_path):
    with open(file_path, 'r', encoding="utf-8") as file:
        json_contents = json.load(file)

    hs_codes = [content["code"] for content in json_contents if len(content["code"]) == 6 and content["code"].isdigit()]
    print("HS codes created successfully")
    return hs_codes

def fetch_country_codes(api_url, headers):
    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()  # check for HTTP errors

        data = response.json()
        country_codes = [item["code"] for item in data['data']]
        print("Country codes retrieved successfully")
        return country_codes
    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {e}")
        return None

def fetch_product_titles(conn_string):
    try:
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        cursor.execute("SELECT prod_title FROM moaahdb.public.comptox_product_title_hscode")
        product_titles = cursor.fetchall()
        cursor.close()
        conn.close()
        return [title[0] for title in product_titles]
    except psycopg2.Error as e:
        print(f"Database error occurred: {e}")
        return None

def generate_hs_code_match_urls(hs_codes, country_codes, base_url, index_file):
    file_prefix = "sitemap_hs_code_match"
    chunk = []
    file_count = 1  # Start file numbering from 1
    
    for hs_code in hs_codes:
        for category in country_codes:
            chunk.append(f"https://moaah.com/search-results/smart-hs?product={hs_code}&category={category}")
            if len(chunk) == CHUNK_SIZE:
                generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
                file_count += 1
                chunk = []
    
    if chunk:
        generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
    
    print("Sitemap for HS code match written successfully!")

def generate_import_duty_urls(hs_codes, country_codes, base_url, index_file):
    file_prefix = "sitemap_import_duty"
    chunk = []
    file_count = 1  # Start file numbering from 1
    
    for hs_code in hs_codes:
        for dest_country in country_codes:
            for origin_country in country_codes:
                chunk.append(f"https://moaah.com/search-results/import_duty?q={hs_code}&dest_country={dest_country}&origin_country={origin_country}")
                if len(chunk) == CHUNK_SIZE:
                    generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
                    file_count += 1
                    chunk = []
    
    if chunk:
        generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
    
    print("Sitemap for import duty written successfully!")

def generate_customs_regulations_urls(hs_codes, country_codes, base_url, index_file):
    file_prefix = "sitemap_customs_regulations"
    chunk = []
    file_count = 1  # Start file numbering from 1
    
    for hs_code in hs_codes:
        for partner in country_codes:
            for imposing in country_codes:
                chunk.append(f"https://moaah.com/search-results/import-export-regulations-live?q={hs_code}&partner={partner}&imposing={imposing}")
                if len(chunk) == CHUNK_SIZE:
                    generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
                    file_count += 1
                    chunk = []
    
    if chunk:
        generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
    
    print("Sitemap for customs regulations written successfully!")

def generate_dg_goods_urls(product_titles, base_url, index_file):
    file_prefix = "sitemap_dg_goods"
    chunk = []
    file_count = 1  # Start file numbering from 1
    
    for prod_title in product_titles:
        chunk.append(f"https://moaah.com/search-results/smart-match?keyword={prod_title}&regulation=iata")
        chunk.append(f"https://moaah.com/search-results/smart-match?keyword={prod_title}&regulation=imdg")
        if len(chunk) >= CHUNK_SIZE:
            generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
            file_count += 1
            chunk = []
    
    if chunk:
        generate_xml_sitemap(chunk, file_prefix, base_url, index_file, file_count)
    
    print("Sitemap for DG goods written successfully!")

def main():
    # Load HS codes
    hs_codes = load_hs_codes('wto-hs-desc-202405.json')
    
    # Fetch country codes
    api_url = 'https://moaah-api.com/web-app/smart-hs/getHsCountries'
    headers = {
        'X-User-Sub': 'KzNZJAK4TamQrHX34EayryukBO9sxjam',
        'X-User-Email': 'no.reply.moaah@gmail.com'
    }
    country_codes = fetch_country_codes(api_url, headers)
    if country_codes is None:
        print("Failed to retrieve country codes.")
        return
    
    # Fetch product titles
    conn_string = "dbname=moaahdb user=hung password=3b-35R</E6IA host=108.181.197.187 port=10074"
    product_titles = fetch_product_titles(conn_string)
    if product_titles is None:
        print("Failed to retrieve product titles.")
        return

    base_url = "https://moaah.com"  # Base URL where sitemaps will be accessible

    # Open the sitemap index file for writing
    index_file = generate_sitemap_index("sitemap_index.xml")

    try:
        # Generate URLs and write to files
        generate_hs_code_match_urls(hs_codes, country_codes, base_url, index_file)
        generate_import_duty_urls(hs_codes, country_codes, base_url, index_file)
        generate_customs_regulations_urls(hs_codes, country_codes, base_url, index_file)
        generate_dg_goods_urls(product_titles, base_url, index_file)

        # Write the closing tag of the sitemap index
        index_file.write('</sitemapindex>\n')
    finally:
        # Ensure the file is closed properly
        index_file.close()

if __name__ == "__main__":
    main()