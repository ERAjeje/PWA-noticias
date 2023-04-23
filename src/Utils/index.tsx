export const renderImage = (image: string, description: string) => <div><img src={image} alt={description} width={"100%"} /></div>;

export const renderDescription = (description: string) => <p>{description}</p>;