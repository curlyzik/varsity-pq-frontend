export const storeUniDataToDB = async (uniData) => { 
    for (let pqData of uniData) {
      const dataPost = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/universities/`,
        {
          name: pqData.name,
          address: pqData.address === "" ? "address" : pqData.address,
          type: pqData.type.toLowerCase(),
          faculty: [],
        }
      );
      console.log(dataPost);
    }
}