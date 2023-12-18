'use client';

import { useEffect, useState } from 'react';
import { CalendarIcon, StarIcon } from '@heroicons/react/20/solid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogDemo } from '@/components/ui/popup';
import { getVehicleAllDetailsByVechicleId } from '@/app/_actions/get_vehicle_details_by_vehicle_id';
import Carousel from '@/components/ui/carousel/carousel';
import Link from 'next/link';
import { dateFormatter } from '@/lib/dateFormatter';
import { useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecentlyViewedVehicles, Vehicle } from '@/lib/local_recently_viewed';

export default function SingleVehicleDetails({ params }: { params: { id: string } }) {
    const [vehicleDetails, setvehicleDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vehicleImages, setVehicleImages] = useState([]);
    const [vehicleHostDetails, setVehicleHostDetails] = useState(null);
    const [reserverList, setReserverList] = useState(null);

    const [pickupTime, setPickupTime] = useState('10:00 AM');
    const [dropTime, setDropTime] = useState('9:30 PM');

    const searchParams = useSearchParams();

    const currentDate = new Date();

    const from = new Date(currentDate);
    from.setDate(currentDate.getDate());

    const to = new Date(currentDate);
    to.setDate(currentDate.getDate() + 3);

    const [startDate, setStartDate] = useState<Date>(from);
    const [endDate, setEndDate] = useState<Date>(to);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('auth_token_login') || '';
                const data = await getVehicleAllDetailsByVechicleId({ vehicleid: params.id }, token);
                const vehicleDetails = data.vehicleAllDetails?.[0] || null;
                const vehicleImages = data.vehicleAllDetails?.[0]?.imageresponse || [];
                const vehicleHostDetails = data.vehicleHostDetails?.[0] || null;
                const reserverList = data.reserverList?.[0] || null;

                setvehicleDetails(vehicleDetails);
                setVehicleImages(vehicleImages);
                setVehicleHostDetails(vehicleHostDetails);
                setReserverList(reserverList);

                if (vehicleDetails && vehicleImages.length > 0) {
                    localSessionStorageHandler(vehicleDetails, vehicleImages);
                }
            } catch (error) {
                console.error('Error fetching data', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params]);



    function localSessionStorageHandler(vehicleDetails:any, vehicleImageResponse:any) {
        const vehicle: Vehicle = {
            vehicleId: vehicleDetails.id ?? params.id,
            make: vehicleDetails.make,
            model: vehicleDetails.model,
            year: vehicleDetails.year,
            image: vehicleImageResponse[0].imagename,
            price: vehicleDetails.price_per_hr,
            tripCount: vehicleDetails.tripcount,
        };

        RecentlyViewedVehicles.addVehicle(vehicle);
        console.log("data added to the secure storage.")
    }


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

    return (
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-2'>
            <div className='pt-6'>
                <nav aria-label='Breadcrumb'>
                    <ol role='list' className='mx-auto flex'>
                        <li>
                            <div className='flex items-center'>
                                <Link href='/' className='mr-2 text-sm font-medium text-neutral-900'>
                                    Home
                                </Link>
                                <svg width={16} height={20} viewBox='0 0 16 20' fill='currentColor' aria-hidden='true' className='h-5 w-4 text-neutral-300'>
                                    <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                                </svg>
                            </div>
                        </li>

                        <li>
                            <div className='flex items-center'>
                                <Link href='/vehicles' className='mr-2 text-sm font-medium text-neutral-900'>
                                    Available Vehicles
                                </Link>
                                <svg width={16} height={20} viewBox='0 0 16 20' fill='currentColor' aria-hidden='true' className='h-5 w-4 text-neutral-300'>
                                    <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                                </svg>
                            </div>
                        </li>

                        {vehicleDetails && (
                            <li className='text-sm'>
                                <Link href={`/vehicles/${params.id}`} aria-current='page' className='font-medium text-neutral-500 hover:text-neutral-600'>
                                    {vehicleDetails.make} {vehicleDetails.model} {vehicleDetails.year}
                                </Link>
                            </li>
                        )}
                    </ol>
                </nav>

                {vehicleDetails ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-10'>
                        <div className='flex-col flex lg:col-span-2'>
                            <div className='sm:overflow-hidden rounded-lg '>
                                <Carousel autoSlide={false}>
                                    {vehicleImages.map((s, i) => (
                                        <img key={i} src={s.imagename} className='max-h-fit' alt={`vehicle image ${i}`} />
                                    ))}
                                </Carousel>
                            </div>

                            <div className='space-y-4 mt-6'>
                                <h1 className='text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl'>
                                    {vehicleDetails.make} {vehicleDetails.model} {vehicleDetails.year}
                                </h1>
                                <span className='text-xs'>{vehicleDetails.vin}</span>
                                <p className='text-base text-neutral-700 max-w-3xl'>{vehicleDetails.desciption}</p>

                                <div className='grid '>
                                    <h3 className='text-sm font-medium text-neutral-900'>Highlights</h3>

                                    <div className='mt-4'>
                                        <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                                            {vehicleDetails.manufacturename && vehicleDetails.manufacturename !== 'Not Applicable' && vehicleDetails.manufacturename !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.manufacturename}</li>}
                                            {vehicleDetails.trim && vehicleDetails.trim !== 'Not Applicable' && vehicleDetails.trim !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.trim}</li>}
                                            {vehicleDetails.vehicleType && vehicleDetails.vehicleType !== 'Not Applicable' && vehicleDetails.vehicleType !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.vehicleType}</li>}
                                            {vehicleDetails.bodyclass && vehicleDetails.bodyclass !== 'Not Applicable' && vehicleDetails.bodyclass !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.bodyclass}</li>}
                                            {vehicleDetails.doors && vehicleDetails.doors !== 'Not Applicable' && vehicleDetails.doors !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.doors} Doors</li>}
                                            {vehicleDetails.fueltypeprimary && vehicleDetails.fueltypeprimary !== 'Not Applicable' && vehicleDetails.fueltypeprimary !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.fueltypeprimary}</li>}
                                            {vehicleDetails.drivetype && vehicleDetails.drivetype !== 'Not Applicable' && vehicleDetails.drivetype !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.drivetype}</li>}
                                            {vehicleDetails.wlectrificationlevel && vehicleDetails.wlectrificationlevel !== 'Not Applicable' && vehicleDetails.wlectrificationlevel !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.wlectrificationlevel}</li>}
                                            {vehicleDetails.seatingCapacity && vehicleDetails.seatingCapacity !== 'Not Applicable' && vehicleDetails.seatingCapacity !== 'NA' && <li className='text-neutral-600'>{vehicleDetails.seatingCapacity} Seats</li>}
                                        </ul>
                                    </div>
                                </div>

                                <div className=' flex flex-col gap-2'>
                                    <h2 className='text-sm font-medium text-neutral-900'>Hosted By</h2>

                                    <div className='relative  flex items-center gap-x-4'>
                                        <img src={`data:image/png;base64, ${vehicleHostDetails.userimage}`} alt={vehicleHostDetails.firstname} className='h-14 w-14 rounded-full bg-neutral-50' />
                                        <div className='text-sm leading-6'>
                                            <Link href='' className='font-semibold text-neutral-900'>
                                                {vehicleHostDetails.firstname} {vehicleHostDetails.lastname}
                                            </Link>
                                            <p className='text-neutral-600'>Joined on {dateFormatter(vehicleHostDetails.createddate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 lg:row-span-3 lg:mt-0'>
                            <h2 className='sr-only'>Product information</h2>
                            <p className='text-3xl font-bold tracking-tight text-neutral-900'>{`$${vehicleDetails.price_per_hr} / day`}</p>
                            {/* Reviews */}

                            {reserverList?.rating && (
                                <div className='mt-6'>
                                    <div className='flex items-center'>
                                        <div className='flex items-center'>
                                            <Star className='h-5 w-5 text-neutral-900' fill='currentColor' />
                                            <span className='ml-2'>{reserverList.rating.toFixed(1)}</span>
                                        </div>
                                        <p className='ml-3 text-sm font-medium text-primary hover:text-primary'>({reserverList.tripcount} trips)</p>
                                    </div>
                                </div>
                            )}

                            <div className='mt-10'>
                                <div className='flex flex-col gap-1 w-full flex-2'>
                                    <label className='text-xs font-medium'>Trip Start Date & End Date</label>
                                    <DialogDemo vehicleid={params.id} startDate={startDate} endDate={endDate} setParentError={setError} />
                                </div>

                                <div className='flex mt-4'>
                                    <div className='flex flex-col gap-1 w-full flex-2'>
                                        <label className='text-xs font-medium'>Trip Start Time</label>
                                        <Select
                                            onValueChange={time => {
                                                setPickupTime(time);
                                            }}
                                            defaultValue={pickupTime}>
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
                                    <div className='ml-4 flex flex-col gap-1 w-full flex-2'>
                                        <label className='text-xs font-medium'>Trip End Time</label>
                                        <Select
                                            onValueChange={time => {
                                                setDropTime(time);
                                            }}
                                            defaultValue={dropTime}>
                                            <SelectTrigger className='w-full  '>
                                                <SelectValue placeholder='Select end time' />
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

                                <div className='mt-10'>
                                    <div className='flex items-center justify-between'>
                                        <h3 className='text-sm font-medium text-neutral-900'>Total : $ 235.97</h3>
                                    </div>
                                    <div className='mt-4'>
                                        <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                                            <li className='text-neutral-500'>Total Rent Charge $45 X 6 = $267.00</li>
                                            <li className='text-neutral-500'>Taxes 8.2% equals $ 34.85</li>
                                            <li className='text-neutral-500'>Authorization Charges : 20%</li>
                                        </ul>
                                    </div>

                                    <div className='mt-4'>
                                        <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                                            <span className='text-neutral-600'>You will not be charged untill the host accept the resarvation request.</span>
                                        </ul>
                                    </div>

                                    <div className='mt-4'>
                                        <span className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>Free Cancellation till 3rd jan 2024</span>
                                    </div>
                                </div>
                                <Link href="/requesttocheckout" title="" className="flex">

                                <Button type='submit' className='mt-10 flex w-full' disabled={!!error}>
                                    Request to checkout
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='text-center mt-10 py-12 md:py-20'>{isLoading ? <p>Loading...</p> : <p>Error: Failed to fetch vehicle details.</p>}</div>
                )}

                {/* <div className='mx-auto flex max-w-2xl space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 items-center justify-center h-[600px] w-screen bg-white shadow-md rounded-md'>
                    <div className='text-center'>
                        <p className='text-base font-semibold text-indigo-600'>Cooming Soon.</p>
                        <h1 className='mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl'>Messages to the Host with Twillio</h1>
                        <p className='mt-6 text-base leading-7 text-neutral-600'>Page Implementation Pending.</p>
                        <div className='mt-10 flex items-center justify-center gap-x-6'>
                            <a href='#' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Search Vehicles
                            </a>
                            <a href='#' className='text-sm font-semibold text-neutral-900'>
                                Contact support <span aria-hidden='true'>&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
