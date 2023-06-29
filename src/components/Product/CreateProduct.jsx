import { React, useState } from "react";
import axios from "axios";
import { server } from "../../server";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  // const [ratings, setRatings] = useState("");
  // const [numberOfReviews, setNumberOfReviews] = useState("");
  // const [review, setReview] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdProduct = {
      name,
      price,
      description,
      image,
      seller,
      stock,
      category,
      // numberOfReviews,
      // ratings,
      // review
    };
    console.log("product from frontend", createdProduct);

    axios
      .post(`${server}/createProduct`, createdProduct)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setPrice(0);
    setDescription("");

    setImage("");
    setSeller("");
    setStock();
    setCategory("");
    // setNumberOfReviews(0);
    // setReview([]);
    // setRatings("");
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <lable className="pb-2">
            Name <span className="text-red-500"></span>
          </lable>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name"
          />
        </div>
        <br />
        <div>
          <lable className="pb-2">
            Description <span className="text-red-500"></span>
          </lable>
          <input
            type="text"
            name="Description"
            value={description}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <br />
        <div>
          <lable className="pb-2">
            Category <span className="text-red-500"></span>
          </lable>
          <select className="w-full mt-2 border h-[35px] rounded-[5px]"  
          value={category}
          onChange={(e)=> setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
            <option value="Headphones">Headphones</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Clothes/Shoes">Clothes/Shoes</option>
            <option value="Beauty/Health">Beauty/Health</option>
            <option value="Sports">Sports</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Home">Home</option>

          </select>
        </div>
      </form>
    </div>
  );
};
export default CreateProduct;
