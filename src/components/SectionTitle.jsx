/* eslint-disable react/prop-types */
const SectionTitle = ({ heading, subTitle}) => {
    return (
        <div className='lg:w-4/12 mx-auto text-center lg:my-10 md:my-5 my-3'>
            <p className='text-yellow-600 my-4'>{subTitle}</p>
            
            <h3 className='lg:text-3xl border-y-4 lg:py-6 py-2  md:py-4'>{heading}</h3>
            
        </div>
    );
};

export default SectionTitle;