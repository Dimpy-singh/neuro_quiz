import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.url,process.env.apikey)
//export supabase
export default supabase;
