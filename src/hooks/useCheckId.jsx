export default function useCheckId() {
    const validate = (id) => {
        if(typeof id != "string") {
            return false;
        }

        if(id.length != 24) {
            return false;
        }

        return true;
    }

    return {validate};
}