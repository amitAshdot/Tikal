import React, { useEffect } from 'react';

const Loading = ({ extraClass }) => {

    useEffect(() => {
    }, [extraClass]);

    return <div className={`loading-screen ${extraClass}`}>
        <div className='lightsaber'>
            <div className='lightsaber-handle'></div>
            <div className='lightsaber-light'></div>
        </div>
    </div>;
};

export default Loading;
