function searchByID(id, array) {
    array.map((e) => {
        if (e.split("%2F")[1].split("_")[0] == id) {
            console.log(e);
            return e;
        }
    });
}

export default searchByID;
