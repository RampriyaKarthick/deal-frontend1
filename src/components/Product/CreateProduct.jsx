import { React, useState, useContext } from "react";
import axios from "axios";
import { server } from "../../server";
import { AuthContext } from "../../context/auth.context";
// import { AiFillFileImage } from "react-icons/ai";
import service from "../../api/service";
import { Link } from "react-router-dom";


const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [negotiationPrice, setNegotiationPrice] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // const [ratings, setRatings] = useState("");
  // const [numberOfReviews, setNumberOfReviews] = useState("");
  // const [review, setReview] = useState([]);

  //const { isLoading, isLoggedIn } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.imageURL.files[0]);
    uploadData.append("name", name);
    uploadData.append("description", description);
    uploadData.append("price", price);
    uploadData.append("negotiable", negotiationPrice);
    uploadData.append("category", category);
    uploadData.append("seller", user._id);
    uploadData.append("stock", stock);
    console.log("User", user)

    console.log("product from frontend", uploadData);
    const gotToken = localStorage.getItem("authToken");
    axios
      .post(`${server}/product/newproduct`, uploadData,  { headers: { authorization: `Bearer ${gotToken}` }})
      .then((res) => {
        console.log(res);
        setUpdateSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setUpdateSuccess(false);
      });

    setName("");
    setPrice(0);
    setDescription("");
    setCategory("");
    setImageUrl("");
    setSeller("");
    setStock(0);
    setNegotiationPrice(false)

   
  };



return (
  <div className="flex flex-col justify-center items-center h-screen">
  <div className="w-full max-w-md mt-20">
    <h2 className="text-2xl font-semibold text-center mt-20 ">Create Product</h2>
    <div className="px-4"></div>
    <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name"
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="Description"
            value={description}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500"></span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]  border-gray-300  placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
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
            <option value="Other">Other</option>
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500 sm:text-sm"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
        </div>
        <br />
        <div>
  <label className="pb-2">Negotiation Price</label>
  <input
    type="checkbox"
    name="negotiationPrice"
    checked={negotiationPrice}
    className="mt-2 form-checkbox h-5 w-5 text-blue-600"
    onChange={(e) => setNegotiationPrice(e.target.checked)}
   
  />
</div>
        <div>
          <label className="pb-2">
            Amount<span className="text-red-500"></span>
          </label>
          <input
            type="number"
            name="Stock"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Amount to sell"
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>

          <br />
          <div className="w-full flex items-center flex-wrap">
            <input
              type="file"
              id="upload"
              name="imageURL"
              // className="hidden"
              multiple
              onChange={handleFileUpload}
              required
            />
            {/* <lable htmlFor="upload">
            <AiFillFileImage size={30} className="mt-3 " color="#555" />
          </lable> */}
            {/* why don´t you fucking work!?!?!?! shit code */}

            {imageUrl &&
              imageUrl.map((i) => (
                <img
      src={URL.createObjectURL(imageUrl[imageUrl.length - 1])}
      alt=""
      className="h-[120px] w-[120px] object-cover m-2"
    />
              ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none hover:ring-blue-500 hover:border-blue-500 sm:text-sm"
          />
        </div>
       
      </form>
      <div/>
      <div className="flex justify-center">
      {updateSuccess && (
          <p className="text-green-600 mt-4">Product created successfully!</p>
        )}
      </div>
     
     
    </div>
    <Link to="/profile" className="mt-5 text-blue-500">
        Go to SellerDashboard to view, update and see the negotiations received from buyers 
      </Link>
    </div>
  );
};
export default CreateProduct;
