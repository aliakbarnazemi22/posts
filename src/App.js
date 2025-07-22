import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchLoading(true);

    if (!value.trim()) {
      setSearchData([]);
      setSearchLoading(false);
      return;
    }

    axios
      .get(`https://dummyjson.com/posts/search?q=${value}`)
      .then((response) => {
        setSearchData(response.data.posts);
      })
      .catch((error) => {
        console.error("خطا در دریافت داده:", error);
      })
      .finally(() => setSearchLoading(false));
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/posts?limit=5")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("خطا در دریافت داده:", error);
        alert("خطا در دریافت داده");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="my-2 card p-4">
      <h2 className="text-2xl font-bold text-center">Posts List</h2>
      <br />
      <input
        type="text"
        placeholder="Search"
        className="w-full p-3 rounded-md border border-gray-300 my-2 focus:outline-none"
        onChange={handleSearch}
      />

      <div className="flex justify-between">
        <div className="mt-6 w-1/2 p-2">
          <h2 className="text-2xl font-bold text-center">
            Search Results
          </h2>
          <hr className="my-6" />
          <div className="p-4 flex flex-col">
            {searchLoading
              ? "loading..."
              : searchData.map((item2) => (
                  <div key={item2.id}>
                    <h3
                      className="text-lg text-left font-bold poppins line-clamp-1 text-blue-600 cursor-pointer"
                      onClick={() => openModal(item2)}
                    >
                      title: {item2.title}
                    </h3>
                    <p className="text-sm text-left poppins line-clamp-1 mt-1">
                      body: {item2.body}
                    </p>
                    <hr className="my-6" />
                  </div>
                ))}
          </div>
        </div>
        <div className="w-[1px] bg-gray-300 my-4"></div>
        <div className="my-6 w-1/2 p-2">
          <h2 className="text-2xl font-bold text-center">Posts List</h2>
          <hr className="my-6" />
          <div className="p-4 flex flex-col">
            {loading
              ? "loading..."
              : data.posts.map((item) => (
                  <div key={item.id}>
                    <h3
                      className="text-lg text-left font-bold poppins line-clamp-1 text-blue-600 cursor-pointer"
                      onClick={() => openModal(item)}
                    >
                      title: {item.title}
                    </h3>
                    <p className="text-sm text-left poppins line-clamp-1 mt-1">
                      body: {item.body}
                    </p>
                    <hr className="my-6" />
                  </div>
                ))}
          </div>
        </div>
      </div>

      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <p className="mb-2 text-black mb-4 font-bold">id: {selectedPost.id}</p>
            <h2 className="text-xl font-bold mb-4 text-black">
              title: {selectedPost.title}
            </h2>
            <p className="mb-6 text-black">body: {selectedPost.body}</p>
            <p className="mb-2 text-black">views: {selectedPost.views}</p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
