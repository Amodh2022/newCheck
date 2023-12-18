"use client"

import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogDemo } from '@/components/ui/popup';
import { RecentlyViewedVehicles, Vehicle } from '@/lib/local_recently_viewed';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const product = {
    name: 'Toyota Camry 2022',
    price: 45,
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Home', href: '#' },
        { id: 2, name: 'Trips', href: '#' },
        { id: 2, name: 'Trip Details', href: '#' },
    ],
    images: [
        {
            src: 'https://images.turo.com/media/vehicle/images/CkpW7zKPTe6oKqK-AR42mw.2880x1400.jpg',
            alt: 'Toyota Camry 2022',
        },
        {
            src: 'https://images.turo.com/media/vehicle/images/01ygPeLERWKvRFm--DKVUw.2880x1400.jpg',
            alt: 'Toyota Camry 2022',
        },
        {
            src: 'https://images.turo.com/media/vehicle/images/Ss0_VJuQQReUzao4csEpSQ.2880x1400.jpg',
            alt: 'Toyota Camry 2022',
        },
        {
            src: 'https://images.turo.com/media/vehicle/images/b9cC7dlLTjeziqwrINpEYA.2880x1400.jpg',
            alt: 'Toyota Camry 2022',
        },
    ],

    description:
        "This is a beautiful and comfortable car safe and security this is a good opportunity to get a nice trip in your stay in the San Francisco. Clear windows, eco gas, and if you like turbo. Leather seat black and red car Toyota Camry 2022 the best car to drive",
    highlights: [
        'Electric & Gasoline Both',
        'Loved by all of our Renters',
        'Automatic Transition',
        'Android Auto',
        'Bluetooth GPS, and USB Chargerand More.',
    ],
    charges: [
        'Total Rent Charge $45 X 6 = $267.00',
        'Taxes 18% equals $ 34.85',
        'Authorization Charges : 20%',
    ],
    details:
        'Add optional Extras to your trip at checkout.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SingleVehicleDetails() {

    const [tabselectedindex, settabselectedindex] = useState(0);

    const [CurrentTripStartTime, onChangeCurrentTripStartTime] = useState('10:00');
    const [CurrentTripEndTime, onChangeCurrentTripEndTime] = useState('10:00');

    const currentDate = new Date();
    const from = new Date(currentDate);
    from.setDate(currentDate.getDate());

    const to = new Date(currentDate);
    to.setDate(currentDate.getDate() + 3);

    const [startDate, setStartDate] = useState<Date>(from);
    const [endDate, setEndDate] = useState<Date>(to);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");


    const options = [
        { value: '00:00', label: '12:00 AM' },
        { value: '00:30', label: '12:30 AM' },
        { value: '01:00', label: '01:00 AM' },
        { value: '01:30', label: '01:30 AM' },
        { value: '02:00', label: '02:00 AM' },
        { value: '02:30', label: '02:30 AM' },
        { value: '03:00', label: '03:00 AM' },
        { value: '03:30', label: '03:30 AM' },
        { value: '04:00', label: '04:00 AM' },
        { value: '04:30', label: '04:30 AM' },
        { value: '05:00', label: '05:00 AM' },
        { value: '05:30', label: '05:30 AM' },
        { value: '06:00', label: '06:00 AM' },
        { value: '06:30', label: '06:30 AM' },
        { value: '07:00', label: '07:00 AM' },
        { value: '07:30', label: '07:30 AM' },
        { value: '08:00', label: '08:00 AM' },
        { value: '08:30', label: '08:30 AM' },
        { value: '09:00', label: '09:00 AM' },
        { value: '09:30', label: '09:30 AM' },
        { value: '10:00', label: '10:00 AM' },
        { value: '10:30', label: '10:30 AM' },
        { value: '11:00', label: '11:00 AM' },
        { value: '11:30', label: '11:30 AM' },
        { value: '12:00', label: '12:00 PM' },
        { value: '12:30', label: '12:30 PM' },
        { value: '13:00', label: '01:00 PM' },
        { value: '13:30', label: '01:30 PM' },
        { value: '14:00', label: '02:00 PM' },
        { value: '14:30', label: '02:30 PM' },
        { value: '15:00', label: '03:00 PM' },
        { value: '15:30', label: '03:30 PM' },
        { value: '16:00', label: '04:00 PM' },
        { value: '16:30', label: '04:30 PM' },
        { value: '17:00', label: '05:00 PM' },
        { value: '17:30', label: '05:30 PM' },
        { value: '18:00', label: '06:00 PM' },
        { value: '18:30', label: '06:30 PM' },
        { value: '19:00', label: '07:00 PM' },
        { value: '19:30', label: '07:30 PM' },
        { value: '20:00', label: '08:00 PM' },
        { value: '20:30', label: '08:30 PM' },
        { value: '21:00', label: '09:00 PM' },
        { value: '21:30', label: '09:30 PM' },
        { value: '22:00', label: '10:00 PM' },
        { value: '22:30', label: '10:30 PM' },
        { value: '23:00', label: '11:00 PM' },
        { value: '23:30', label: '11:30 PM' },
    ];

    const [pickupTime, setPickupTime] = useState('10:00 AM');
    const [dropTime, setDropTime] = useState('9:30 PM');


    const times = [];
    for (let hour = 10; hour <= 21; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (!(hour === 22 && minute === 30)) {
                const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
                const formattedMinute = minute === 0 ? '00' : minute;
                const period = hour < 12 ? 'AM' : 'PM';

                const time = `${formattedHour}:${formattedMinute} ${period}`;
                times.push(time);
            }
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    const handleDateSelect = (selectedDate) => {
        console.log("Selected Date Range:", selectedDate);
      };
      
      useEffect(() => {
        
        const vehicle: Vehicle = {

            vehicleId:"1234",
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            image: 'https://images.turo.com/media/vehicle/images/CkpW7zKPTe6oKqK-AR42mw.2880x1400.jpg',
            price: 30,
            tripCount: 5
        };
        
        RecentlyViewedVehicles.addVehicle(vehicle);
        console.log("data added to the secure storage.")
    }, []);


    return (
        <div className="bg-white mx-auto flex flex-col max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between">
                    <div className="flex flex-col mx-4">
                        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                            Trips
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">All your trips will be listed here. Click individual trips see details section for more information</p>
                    </div>

                    <div className="flex">
                        <Button
                            onClick={() => settabselectedindex(0)}
                            className={`my-4 ${tabselectedindex === 0 ? 'bg-primary text-white' : ''}`}
                            variant="outline"
                        >
                            Current Bookings
                        </Button>
                        <Button
                            onClick={() => settabselectedindex(1)}
                            className={`mt-4 mx-4 ${tabselectedindex === 1 ? 'bg-red-700 text-white' : ''}`}
                            variant="outline"
                        >
                            Previous Booking History
                        </Button>
                    </div>
                </div>
            
            <div className="pt-6">
                {/* <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <Link href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                        </Link>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav> */}

                {/* Image gallery */}

                {tabselectedindex === 0 && (
                    <div>
                        <div className="bg-white shadow-lg rounded-md p-4 flex justify-between mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                                <img
                                    src={product.images[0].src}
                                    alt={product.images[0].alt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <img
                                        src={product.images[1].src}
                                        alt={product.images[1].alt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <img
                                        src={product.images[2].src}
                                        alt={product.images[2].alt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                                <img
                                    src={product.images[3].src}
                                    alt={product.images[3].alt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">{`$${product.price} / day`}</p>
                                {/* Reviews */}
                                <div className="mt-6">
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                        <a href={reviews.href} className="ml-3 text-sm font-medium text-primary hover:text-primary">
                                            {reviews.totalCount} reviews
                                        </a>
                                    </div>
                                </div>

                                <form className="mt-10">



                                    <div className="flex mt-4">
                                        <div className="flex flex-col gap-1 w-full flex-2"> {/* Use flex-2 for date picker */}
                                            <label className="text-xs font-medium">
                                                Trip Date
                                            </label>
                                            {/* <DialogDemo/> */}
                                        </div>

                                    </div>

                                    <div className="flex mt-4">
                                        <div className="flex flex-col gap-1 w-full flex-2"> {/* Use flex-2 for date picker */}
                                            <label className="text-xs font-medium">
                                                Trip Start Time
                                            </label>

                                            <Select
                                                onValueChange={time => {
                                                    setPickupTime(time);
                                                }}
                                                defaultValue={times[0]}>
                                                <SelectTrigger className='w-full  '>
                                                    <SelectValue placeholder='Select start time' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map(time => (
                                                        <SelectItem key={time} value={time} className='cursor-pointer'>
                                                            {time}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="ml-4 flex flex-col gap-1 w-full flex-2"> {/* Use flex-2 for date picker */}
                                            <label className="text-xs font-medium">
                                                Trip End Time
                                            </label>

                                            <Select
                                                onValueChange={time => {
                                                    setDropTime(time);
                                                }}
                                                defaultValue={times[0]}>
                                                <SelectTrigger className='w-full  '>
                                                    <SelectValue placeholder='Select start time' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {times.map(time => (
                                                        <SelectItem key={time} value={time} className='cursor-pointer'>
                                                            {time}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    </div>

                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Total : $ 235.97</h3>

                                        </div>
                                        <div className="mt-4">
                                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                {product.charges.map((highlight) => (
                                                    <li key={highlight} className="text-gray-400">
                                                        <span className="text-gray-600">{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-4">
                                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                <span className="text-gray-600">You will not be charged untill the host accept the resarvation request.</span>
                                            </ul>
                                        </div>

                                        <div className="mt-4">
                                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Free Cancellation till 3rd jan 2024</span>
                                        </div>

                                    </div>


                                    <button
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Request for cancellation
                                    </button>
                                </form>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Description and details */}
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{product.description}</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                    <div className="mt-4">
                                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                            {product.highlights.map((highlight) => (
                                                <li key={highlight} className="text-gray-400">
                                                    <span className="text-gray-600">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                    <div className="mt-4 space-y-6">
                                        <p className="text-sm text-gray-600">{product.details}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex flex-col">
                                <h2 className="text-sm font-medium text-gray-900">Hosted By</h2>

                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <a href="">
                                                <span className="absolute inset-0" />
                                                Sundar Raj sharma
                                            </a>
                                        </p>
                                        <p className="text-gray-600">Austin, Texas</p>
                                    </div>
                                </div>
                            </div>



                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Description and details */}
                                <div>
                                    <h3 className="sr-only">Payment Details</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900"></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
                {tabselectedindex === 1 && (
                    <div className="mx-auto flex max-w-2xl space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 items-center justify-center h-[600px] w-screen bg-white shadow-md rounded-md">
                        <div className="text-center">
                            <p className="text-base font-semibold text-indigo-600">Cooming Soon.</p>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Messages to the Host with Twillio</h1>
                            <p className="mt-6 text-base leading-7 text-gray-600">Page Implementation Pending.</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Search Vehicles
                                </a>
                                <a href="#" className="text-sm font-semibold text-gray-900">
                                    Contact support <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>


    )
}
