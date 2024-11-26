const banners = [
  {
    banner: "/images/banner/1.webp",
    mainColor: "#131635",
  },
  {
    banner: "/images/banner/2.webp",
    mainColor: "#3f5e8a",
  },
  {
    banner: "/images/banner/3.webp",
    mainColor: "#947c7c",
  },
  {
    banner: "/images/banner/4.webp",
    mainColor: "#8a8d3a",
  },
];

export const generateRandomBanner = async () => {
  const randomIndex = Math.floor(Math.random() * banners.length);
  return banners[randomIndex];
};
