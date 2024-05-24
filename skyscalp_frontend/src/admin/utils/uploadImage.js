
export async function uploadImage(imageFile) {
    try {
        var formdata = new FormData();
        formdata.append("image", imageFile);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        let apiData = await fetch("https://api.imgbb.com/1/upload?expiration=&key=3b19b2c6efbaba53fd343e2c204611fe", requestOptions)
        // let apiData = await fetch("https://www.imghippo.com/v1/upload?api_key=VCffawTFu79bFkXq7M4knti5DgvSdtpl", requestOptions)
        let response = await apiData.json()
        const uploadedImageUrl = response.data ? response.data.url : null;
        if (response.status === 200) {
            return {
                status: true,
                url: uploadedImageUrl
            }
        }

    }
    catch (err) {
        console.log(`Error uploading image: ${err}`)
        return {
            status: false,
            url: null
        }
    }

}
