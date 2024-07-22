import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import dotenv from 'dotenv'
dotenv.config()
export const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export const insertItems = async () => {
    const { data, error } = await supabase
        .from(`Items`)
        .insert([
            { item_code: 'A', unit_price: 50 },
            { item_code: 'B', unit_price: 35 },
            { item_code: 'C', unit_price: 25 },
            { item_code: 'D', unit_price: 12 }
        ])
    if (error) {
        console.error('Error inserting data into Items', error)
    } else {
        console.log(`Items data inserted into Items:`, data)
    }

}

export const insertOffers = async () => {
    const { data, error } = await supabase
        .from('Offers')
        .insert([
            { item_code: 'A', quantity: 3, price: 140 },
            { item_code: 'B', quantity: 2, price: 60 }
        ])

    if (error) console.error('Error inserting data into Offers', error)
    else console.log('Data inserted into Offers:', data)
}

