import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const ComingSoon = () => {
  return (
    <div
      className="relative h-screen w-full flex items-center justify-center text-center px-5"
      style={{
        backgroundImage: "url(https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-800 opacity-80"></div>

      <div className="relative z-10 flex flex-col justify-center text-yellow-400 w-full h-full items-center">
        <span className="font-bold text-5xl md:text-6xl transition-transform transform hover:scale-110 mb-4">
          LOGO
        </span>
        <h1 className="text-6xl md:text-8xl font-extrabold mt-4 mb-2 transition-transform transform hover:scale-105">
          We are <span className="text-yellow-300">Almost</span> there!
        </h1>
        <p className="text-lg md:text-xl mb-8 font-light max-w-lg">
          Stay tuned for something amazing! Subscribe to get updates.
        </p>

        <div className="mt-8">
          <form className="w-full max-w-md mx-auto">
            <div className="flex items-center border-b border-yellow-400 py-2">
              <input
                className="appearance-none bg-transparent border border-yellow-400 rounded-l-full w-full text-yellow-400 mr-3 py-3 px-4 leading-tight focus:outline-none focus:border-yellow-600 transition duration-300"
                type="email"
                placeholder="username@email.ext"
                aria-label="Email"
                required
              />
              <button
                className="flex-shrink-0 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-r-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 flex justify-center space-x-6">
          <a href="/#" aria-label="Twitter">
            <FaTwitter className="cursor-pointer text-yellow-400 hover:text-yellow-300 h-10 w-10 transition-transform duration-300 transform hover:scale-125" />
          </a>
          <a href="/#" aria-label="Facebook">
            <FaFacebookF className="cursor-pointer text-yellow-400 hover:text-yellow-300 h-10 w-10 transition-transform duration-300 transform hover:scale-125" />
          </a>
          <a href="/#" aria-label="Instagram">
            <FaInstagram className="cursor-pointer text-yellow-400 hover:text-yellow-300 h-10 w-10 transition-transform duration-300 transform hover:scale-125" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
