"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import NoAuthStatePage from "./noauth";
import { getAllUserWishlistedVehicles } from "../_actions/get_all_wishlists";
import { removeUserWishlistVehicle } from "../_actions/unwislist";
import { VehiclesCardsSkeleton } from "../vehicles/vehicleCards";

const Cars = () => {
    const [wishlistedVehicleDetails, setWishlistedVehicleDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const checkUserAndFetchData = async () => {
            const user = localStorage.getItem("session_user");
            setUserLoggedIn(user != null);

            if (user) {
                const id = localStorage.getItem("userId");
                const auth_token = localStorage.getItem("auth_token_login");
                if (id && auth_token) {
                    try {
                        const data = await getAllUserWishlistedVehicles(id, auth_token);
                        setWishlistedVehicleDetails(data);
                    } catch (error) {
                        console.error('Error fetching data', error);
                    }
                }
            }
            setIsLoading(false);
        };

        checkUserAndFetchData();
    }, []);

    const handleAvailabilityCalender = () => {
        alert("Hello there");
    };

    const unWishListHandler = async (vehicleId) => {
        const id = localStorage.getItem("userId");
        const auth_token = localStorage.getItem("auth_token_login");

        if (id && auth_token) {
            try {
                const data = await removeUserWishlistVehicle(id, vehicleId, auth_token);
                if (data.code === '0') {
                    const updatedVehicles = wishlistedVehicleDetails.filter(car => car.vehicleid !== vehicleId);
                    setWishlistedVehicleDetails(updatedVehicles);
                }
            } catch (error) {
                console.error('Error removing wishlist item', error);
            }
        }
    };

    if (isLoading) {
        return <div>
            <div className="flex justify-center items-center h-screen">
                <div className="relative w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-200 rounded-full border-2 border-white"></div>
                </div>
            </div>
        </div>
    }

    return (
        <>
            {wishlistedVehicleDetails.length > 0 ? (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 sm:py-12 lg:py-12">
                    <div className="flex flex-col mx-0">
                        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                            WishLists
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">All of the Wishlisted Items will be listed here.</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {wishlistedVehicleDetails.map((car) => (

                            <div
                                className="bg-white shadow-lg rounded-md py-4 px-4 group relative cursor-pointer col-span-1"
                                key={car.vehicleid}>


                                <div onClick={handleAvailabilityCalender} className="aspect-video w-full overflow-hidden rounded-md bg-neutral-200 lg:aspect-video group-hover:opacity-75 lg:h-44">
                                    <img
                                        src={car.imageresponse[0].imagename}
                                        alt=""
                                        className="h-full w-full object-cover group-hover:scale-110 transition-all ease-in-out object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-3 flex justify-between items-center">
                                    <div>
                                        <Link
                                            href="/"
                                            className="text-sm text-neutral-900 p-0 font-bold">
                                            {`${car.make} ${car.model} ${car.year}`}
                                        </Link>

                                        <div className="flex items-center gap-2">

                                            {/* {car.rating != 0 && (
                                                <div className="rating">
                                                    <p className="text-xs font-medium text-neutral-900 ">
                                                        {car.rating}
                                                    </p>
                                                    <svg
                                                        className="w-4 h-4 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 22 22">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                </div>
                                            )} */}

                                            {(car.tripCount != 0.0 || car.tripCount != 0 || car.tripCount != '0') && (

                                                <p className="text-xs font-medium text-neutral-900  ">
                                                    ({car.tripCount} Trips)
                                                </p>
                                            )}

                                            {(car.tripCount == 0.0 || car.tripCount == 0 || car.tripCount == '0') && (

                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">New</span>
                                            )}
                                        </div>

                                    </div>
                                    <div onClick={() => unWishListHandler(car.vehicleid)} className="flex">
                                        <span
                                            className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium shadow-xl">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.615 20C7.16833 20 6.78733 19.8426 6.472 19.528C6.15733 19.2133 6 18.8323 6 18.385V5.99998H5V4.99998H9V4.22998H15V4.99998H19V5.99998H18V18.385C18 18.845 17.846 19.229 17.538 19.537C17.2293 19.8456 16.845 20 16.385 20H7.615ZM17 5.99998H7V18.385C7 18.5643 7.05767 18.7116 7.173 18.827C7.28833 18.9423 7.43567 19 7.615 19H16.385C16.5383 19 16.6793 18.936 16.808 18.808C16.936 18.6793 17 18.5383 17 18.385V5.99998ZM9.808 17H10.808V7.99998H9.808V17ZM13.192 17H14.192V7.99998H13.192V17Z" fill="black" />
                                            </svg>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <h1>No wishlisted Vehicle</h1>
                </div>
            )}
        </>
    );
};

export default Cars;
