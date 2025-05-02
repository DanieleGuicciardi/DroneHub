import { Link } from "react-router-dom";

const cards = [
  {
    to: "/products/accessories",
    img: "https://res.cloudinary.com/dgtwxbofy/image/upload/v1745180398/CineDownImg_d0baxp.jpg",
    label: "Accessories",
  },
  {
    to: "/help&support",
    img: "https://res.cloudinary.com/dgtwxbofy/image/upload/v1745180409/CineDownImg2_uooaub.jpg",
    label: "Assurance",
  },
  {
    to: "/contacts",
    img: "https://res.cloudinary.com/dgtwxbofy/image/upload/v1745181022/CineDownImg3_s59rp9.jpg",
    label: "Support",
    fullWidth: true,
  },
];

const QuickLinks = () => (
  <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
    {cards.map(({ to, img, label, fullWidth }, i) => (
      <Link
        key={i}
        to={to}
        className={`relative h-64 bg-gray-800 rounded-xl overflow-hidden group ${
          fullWidth ? "md:col-span-2" : ""
        }`}
      >
        <img
          src={img}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
        <span className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
          {label}
        </span>
      </Link>
    ))}
  </div>
);

export default QuickLinks;
