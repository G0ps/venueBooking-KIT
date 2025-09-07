export const capacityValidator = (capacity) => {
    return (capacity > 0 && capacity <= 1000);
}