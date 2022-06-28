const DetailRowViews = ({ person }) => {
    const { firstName, lastName, address: { state, city, streetAddress, zip } } = person;

    return (
        <>
            <p>
                <strong>Person Selected:</strong> {`${firstName} ${lastName}`}
            </p>
            <p>
                <strong>State:</strong> {state}
            </p>
            <p>
                <strong>City:</strong> {city}
            </p>
            <p>
                <strong>Address:</strong> {streetAddress}
            </p>
            <p>
                <strong>Zip:</strong> {zip}
            </p>
        </>
    );
}

export default DetailRowViews;