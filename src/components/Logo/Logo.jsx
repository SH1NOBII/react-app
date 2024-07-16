import  { memo } from 'react';

function Logo({ image }) {

	return <img src={image} alt="Main logo" />;
}

export default memo(Logo);