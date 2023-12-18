import { CheckCircleIcon } from '@heroicons/react/24/outline';

const VerifiedBadge = () => (
  <div className='flex items-center space-x-1 text-green-600'>
    <CheckCircleIcon className='h-5 w-5' />
    <p className='text-sm font-medium'>Verified</p>
  </div>
);
export default VerifiedBadge;