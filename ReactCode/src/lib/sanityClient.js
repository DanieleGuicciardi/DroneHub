
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "y945imea",    
  dataset: "production",               
  apiVersion: "2025-08-04",           
  useCdn: true                        
});
