document.addEventListener("DOMContentLoaded", () => {
  const image1 = document.querySelector(".image1");
  const imageContainer = document.querySelector(".image-container");
  const image2Container = document.querySelector(".image2-container");
  const container = document.querySelector(".container");

  const scrollRatio = 1 / 3;

  container.style.height = `calc(100vh + ${
    image1.offsetHeight / scrollRatio
  }px)`;
  const startOffset = 0;
  const endOffset = startOffset - image1.offsetHeight / scrollRatio;

  window.addEventListener("scroll", () => {
    const containerTop = container.getBoundingClientRect().top;
    image2Container.style.height =
      Math.max(
        0,
        image1.offsetHeight - (startOffset - containerTop) * scrollRatio
      ) + "px";
    if (containerTop <= startOffset && containerTop >= endOffset) {
      imageContainer.style.position = "fixed";
      imageContainer.style.top = startOffset + "px";
    } else if (containerTop > startOffset) {
      imageContainer.style.position = "relative";
      imageContainer.style.top = 0 + "px";
    } else if (containerTop <= endOffset) {
      imageContainer.style.position = "relative";
      imageContainer.style.top = image1.offsetHeight / scrollRatio + "px";
    }
  });
});
