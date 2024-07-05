import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iupkdpieqxplryytuerr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1cGtkcGllcXhwbHJ5eXR1ZXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1NDY4MTEsImV4cCI6MjAzNTEyMjgxMX0.FcvSaML1Z0KLzXWAfXI-xL4b9aGc179uI8Bo2Q_glPI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
