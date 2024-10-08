import toast from "react-hot-toast";
import { addFavouriteToProduct, addToFavourites, removeFromFavourites } from "../../APIs/favourites";
import Swal from "sweetalert2";



// function to add or remove a specific product from favourites 
const handleProductFavourite = (favourite, setFavourite, _id, isMaterial, collectionReference) => {
    setFavourite(!favourite)
    if (!favourite) {
        // add to fav 
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            addToFavourites(user.userID, _id, collectionReference)
                .then(res => {
                    if (!res.status) {
                        toast.error(res.message)
                        setFavourite(false)
                    }
                    else {
                        addFavouriteToProduct(_id, res.data._id, "add", isMaterial, collectionReference)
                            .then(response => {
                                if (!response.status) {
                                    // toast.error(res.message)
                                    setFavourite(true)
                                }
                            }).catch(err => {
                                console.log(err)
                                setFavourite(false)
                            })

                    }
                }).catch(err => {
                    console.log(err)
                    setFavourite(false)
                })

        }
        else {
            Swal.fire(`<h3>Login first to add to favourites</h3>`)
            setFavourite(false)
        }

    }
    else {
        // remove from favv 
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            removeFromFavourites(user.userID, _id)
                .then(res => {
                    if (!res.status) {
                        toast.error(res.message)
                        setFavourite(true)

                    } else {
                        addFavouriteToProduct(_id, res.data._id, "remove", isMaterial, collectionReference)
                            .then(response => {
                                if (!response.status) {
                                    // toast.error(res.message)
                                    setFavourite(true)
                                }
                            }).catch(err => {
                                console.log(err)
                                setFavourite(false)
                            })
                    }
                }).catch(err => {
                    console.log(err)
                    setFavourite(true)
                })

        }
        else {
            Swal.fire("Please login to add to favourites")
        }
    }
};

export default handleProductFavourite