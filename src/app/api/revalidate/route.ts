
import { revalidatePath } from 'next/cache';

export async function POST() {
  console.log('Start revalidating');
  revalidatePath("/", "layout");
  console.log('End revalidating');
  return new Response('Revalidation Done', { status: 200 });
}
