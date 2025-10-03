export default function useCheckId() {
    const validate = (id) => {
        return /^[0-9a-fA-F]{24}$/.test(id); //regex expression, tjekker om denne pattern
        //som jeg fandt på et forum, som matcher objectIDs, matcher id'et. Retunere true eller false baseret på om den gør eller ej.
    }

    

    return {validate};
}