
const scrollTo = async () => {
  await new Promise((resolve) => {
    const distance = 100;
    const delay = 100;

    const timer = setInterval(() => {
      document.scrollingElement.scrollBy(0, distance);

      if (
        document.scrollingElement.scrollTop + window.innerHeight >=
        document.scrollingElement.scrollHeight
      ) {
        clearInterval(timer);
        resolve();
      }
    }, delay);
  });
};

module.exports = {
  scrollTo,
};
