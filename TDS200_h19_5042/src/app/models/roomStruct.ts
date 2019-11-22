export default interface RoomStruct {
    rId: string,
    title: string,
    description: string,
    owner: string,
    imgUrl: string,
    address: string,
    isAvailable: boolean,
    ratings?: [any]
}