import { insertItems, insertOffers } from "./seed"

const runSeed = async () => {
    await insertItems()
    await insertOffers()
}
runSeed()