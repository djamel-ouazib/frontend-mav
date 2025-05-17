// import axios from 'axios'
// import { use, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import CommentSection from '../components/CommentSection'
// import { useNavigate } from 'react-router-dom'
// const DetailedProduct = () => {
//   const navigate = useNavigate()
//   const user = JSON.parse(localStorage.getItem('user'))
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)
//   const [selectedColor, setSelectedColor] = useState(null)
//   const [rating, setRating] = useState(0)
//   const [zoomed, setZoomed] = useState(false)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const results = await axios.get(
//           `http://localhost:3000/api/product/details/${id}`
//         )
//         setProduct(results.data)
//       } catch (error) {
//         console.error('Error fetching product details:', error)
//       }
//     }

//     fetchData()
//   }, [id])

//   const handleBuyNow = async () => {
//     if (!user) {
//       alert('you have to login first')
//       return navigate('/login')
//     }
//     try {
//       await axios.post(`http://localhost:3000/add-to-cart/${id}`)
//     } catch (error) {
//       console.error('Error adding product to cart:', error)
//     }
//     alert('Redirecting to payment gateway...')
//   }

//   const handleRating = async (value) => {
//     if (!user) {
//       alert('you have to login first')
//       return navigate('/login')
//     }
//     setRating(value)
//     alert(`You rated this product ${value} stars!`)

//     try {
//       await axios.post(`http://localhost:3000/rate-product/${id}`, {
//         userId: user._id,
//         value: value,
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   if (!product) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="grid grid-cols-2 gap-8 p-8 pt-[100px]">
//       <div className="grid grid-cols-[1fr_4fr] gap-4">
//         <div className="flex flex-col gap-4">
//           {product.available.map((item, index) => (
//             <img
//               key={index}
//               src={item.path}
//               alt={`Thumbnail ${index}`}
//               className="w-[80px] h-[80px] object-cover cursor-pointer border border-gray-300 rounded"
//               onClick={() => setSelectedColor(item)}
//             />
//           ))}
//         </div>

//         <div
//           className={`relative w-full h-[500px] bg-gray-100 rounded overflow-hidden ${
//             zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
//           }`}
//           onClick={() => setZoomed(!zoomed)}
//         >
//           <img
//             src={selectedColor ? selectedColor.path : product.available[0].path}
//             alt="Main Product"
//             className={`w-full h-full object-cover ${
//               zoomed ? 'scale-150 transition-transform' : 'scale-100'
//             }`}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-[3fr_1.5fr] gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.details}</p>
//           <p className="text-lg font-semibold mt-4">
//             Brand: <span className="text-gray-800">{product.brand}</span>
//           </p>
//           <p className="text-lg font-semibold mt-2">
//             Category: <span className="text-gray-800">{product.category}</span>
//           </p>
//           <p className="text-lg font-semibold mt-2">
//             Gender: <span className="text-gray-800">{product.gender}</span>
//           </p>
//           <p className="text-lg font-semibold mt-2">
//             Price: <span className="text-gray-800">{product.price}DA</span>
//           </p>
//           {product.category === 'Fashion' && (
//             <div className="mt-4">
//               <p className="text-lg font-semibold">Available Sizes:</p>
//               <div className="flex gap-4 mt-2">
//                 {product.checkedS && <span className="badge">S</span>}
//                 {product.checkedM && <span className="badge">M</span>}
//                 {product.checkedL && <span className="badge">L</span>}
//                 {product.checkedXL && <span className="badge">XL</span>}
//               </div>
//             </div>
//           )}

//           <div className="mt-6">
//             <p className="text-lg font-semibold">Rate this product:</p>
//             <div className="flex gap-2 mt-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <i
//                   key={star}
//                   className={`fa-solid fa-star text-2xl cursor-pointer ${
//                     star <= rating ? 'text-yellow-500' : 'text-gray-300'
//                   }`}
//                   onClick={() => handleRating(star)}
//                 ></i>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-center">
//           <button
//             onClick={handleBuyNow}
//             className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
//           >
//             Add to cart
//           </button>

//           <div className="mt-4">
//             <p className="text-lg font-semibold">Available Colors:</p>
//             <div className="flex gap-2 mt-2">
//               {product.available.map((item, index) => (
//                 <div
//                   key={index}
//                   className="w-[30px] h-[30px] rounded-full border border-gray-300 cursor-pointer"
//                   style={{ backgroundColor: item.color }}
//                   onClick={() => setSelectedColor(item)}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="col-span-2 mt-8">
//         <CommentSection productId={id} />
//       </div>
//     </div>
//   )
// }

// export default DetailedProduct

// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import CommentSection from '../components/CommentSection'

// const DetailedProduct = () => {
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)
//   const [selectedColor, setSelectedColor] = useState(null) 
//   const [rating, setRating] = useState(0) 
//   const [zoomed, setZoomed] = useState(false) 
//   const [idproduct,setIdproduct]=useState([])
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const results = await axios.get(
//           `http://localhost:3000/api/product/details/${id}`
//         )
//         setProduct(results.data)
//       } catch (error) {
//         console.error('Error fetching product details:', error)
//       }
//     }

//     fetchData()
//   }, [id])
//   const addToCart = async (product) => {
//     const selectedProductColor = selectedColor || product.available[0];
//     setIdproduct(product._id)
//     try {
//       const response = await axios.post("http://localhost:3000/api/cart", {
      
//         name: product.name,
//         brand: product.brand,
//         price: product.price,
//         details: product.details,
//         category: product.category,
//         gender: product.gender,
//         available: [
//           {
//             color: selectedProductColor.color,
//             quantity: 1,  
//             path: selectedProductColor.path,
//           }
//         ],
     
//       });
  
//       alert("Produit ajouté au panier !");
//     } catch (error) {
//       console.error("Erreur lors de l'ajout au panier:", error.response?.data || error.message);
//       alert("Échec de l'ajout au panier : " + (error.response?.data?.message || "Erreur inconnue"));
//     }
//   };
  
  


//   const handleRating = (value) => {
//     setRating(value)
//     alert(`You rated this product ${value} stars!`)
//   }

//   if (!product) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="grid grid-cols-2 gap-8 p-8 pt-[100px]">
      
//       <div className="grid grid-cols-[1fr_4fr] gap-4">
        
//         <div className="flex flex-col gap-4">
//           {product.available.map((item, index) => (
//             <img
//               key={index}
//               src={item.path}
//               alt={`Thumbnail ${index}`}
//               className="w-[80px] h-[80px] object-cover cursor-pointer border border-gray-300 rounded"
//               onClick={() => setSelectedColor(item)}
//             />
//           ))}
//         </div>

        
//         <div
//           className={`relative w-full h-[500px] bg-gray-100 rounded overflow-hidden ${
//             zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
//           }`}
//           onClick={() => setZoomed(!zoomed)}
//         >
//           <img
//             src={selectedColor ? selectedColor.path : product.available[0].path}
//             alt="Main Product"
//             className={`w-full h-full object-cover ${
//               zoomed ? 'scale-150 transition-transform' : 'scale-100'
//             }`}
//           />
//         </div>
//       </div>

      
//       <div className="grid grid-cols-[3fr_1.5fr] gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.details}</p>
//           <p className="text-lg font-semibold mt-4">
//             Brand: <span className="text-gray-800">{product.brand}</span>
//           </p>
//           <p className="text-lg font-semibold mt-2">
//             Category: <span className="text-gray-800">{product.category}</span>
//           </p>
//           <p className="text-lg font-semibold mt-2">
//             Gender: <span className="text-gray-800">{product.gender}</span>
//           </p>
//           <p className="text-lg font-semibold mt-2">
//             Price: <span className="text-gray-800">{product.price}DA</span>
//           </p>
//           {product.category === 'Fashion' && (
//             <div className="mt-4">
//               <p className="text-lg font-semibold">Available Sizes:</p>
//               <div className="flex gap-4 mt-2">
//                 {product.checkedS && <span className="badge">S</span>}
//                 {product.checkedM && <span className="badge">M</span>}
//                 {product.checkedL && <span className="badge">L</span>}
//                 {product.checkedXL && <span className="badge">XL</span>}
//               </div>
//             </div>
//           )}

//           <div className="mt-6">
//             <p className="text-lg font-semibold">Rate this product:</p>
//             <div className="flex gap-2 mt-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <i
//                   key={star}
//                   className={`fa-solid fa-star text-2xl cursor-pointer ${
//                     star <= rating ? 'text-yellow-500' : 'text-gray-300'
//                   }`}
//                   onClick={() => handleRating(star)}
//                 ></i>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-center">
//           <button
           
//             onClick={() => addToCart(product)}
//             className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
//           >
//             Add to Cart
//           </button>
//           <div className="mt-4">
//             <p className="text-lg font-semibold">Available Colors:</p>
//             <div className="flex gap-2 mt-2">
//               {product.available.map((item, index) => (
//                 <div
//                   key={index}
//                   className="w-[30px] h-[30px] rounded-full border border-gray-300 cursor-pointer"
//                   style={{ backgroundColor: item.color }}
//                   onClick={() => setSelectedColor(item)}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="col-span-2 mt-8">
//         <CommentSection productId={id} />
//       </div>
//     </div>
//   )
// }

// export default DetailedProduct

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import { useCart } from '../components/CartContext'  // Import du contexte

const DetailedProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [rating, setRating] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const { addToCart } = useCart()  // Utilisation de la fonction du contexte

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios.get(
          `http://localhost:3000/api/product/details/${id}`
        )
        setProduct(results.data)
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }
    fetchData()
  }, [id])

  // Modification du handler "Add to Cart" pour utiliser le contexte
  const handleAddToCart = () => {
    const selectedProductColor = selectedColor || product.available[0]
    const productToAdd = {
      ...product,
      quantity: 1, // On ajoute la quantité par défaut
      available: [
        {
          color: selectedProductColor.color,
          quantity: 1,
          path: selectedProductColor.path,
        },
      ],
    }
    addToCart(productToAdd) // Ajout du produit via le contexte
    alert("Produit ajouté au panier !")
  }

  const handleRating = (value) => {
    setRating(value)
    alert(`Vous avez noté ce produit ${value} étoiles !`)
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-2 gap-8 p-8 pt-[100px]">
      
      <div className="grid grid-cols-[1fr_4fr] gap-4">
        
        <div className="flex flex-col gap-4">
          {product.available.map((item, index) => (
            <img
              key={index}
              src={item.path}
              alt={`Thumbnail ${index}`}
              className="w-[80px] h-[80px] object-cover cursor-pointer border border-gray-300 rounded"
              onClick={() => setSelectedColor(item)}
            />
          ))}
        </div>

        <div
          className={`relative w-full h-[500px] bg-gray-100 rounded overflow-hidden ${
            zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setZoomed(!zoomed)}
        >
          <img
            src={selectedColor ? selectedColor.path : product.available[0].path}
            alt="Main Product"
            className={`w-full h-full object-cover ${
              zoomed ? 'scale-150 transition-transform' : 'scale-100'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-[3fr_1.5fr] gap-4">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.details}</p>
          <p className="text-lg font-semibold mt-4">
            Brand: <span className="text-gray-800">{product.brand}</span>
          </p>
          <p className="text-lg font-semibold mt-2">
            Category: <span className="text-gray-800">{product.category}</span>
          </p>
          <p className="text-lg font-semibold mt-2">
            Gender: <span className="text-gray-800">{product.gender}</span>
          </p>
          <p className="text-lg font-semibold mt-2">
            Price: <span className="text-gray-800">{product.price} DA</span>
          </p>
          {product.category === 'Fashion' && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Available Sizes:</p>
              <div className="flex gap-4 mt-2">
                {product.checkedS && <span className="badge">S</span>}
                {product.checkedM && <span className="badge">M</span>}
                {product.checkedL && <span className="badge">L</span>}
                {product.checkedXL && <span className="badge">XL</span>}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-lg font-semibold">Rate this product:</p>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fa-solid fa-star text-2xl cursor-pointer ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleRating(star)}
                ></i>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
          <div className="mt-4">
            <p className="text-lg font-semibold">Available Colors:</p>
            <div className="flex gap-2 mt-2">
              {product.available.map((item, index) => (
                <div
                  key={index}
                  className="w-[30px] h-[30px] rounded-full border border-gray-300 cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setSelectedColor(item)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 mt-8">
        <CommentSection productId={id} />
      </div>
    </div>
  )
}

export default DetailedProduct
