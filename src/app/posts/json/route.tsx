import ApiContainer from "@/modules/index";

export async function GET(request: Request) {
  const posts = await ApiContainer.cradle.post.ep.findMany();
 
  return Response.json({ data: posts })
}

export async function POST(request: Request) {
   const postDto = await request.json();

   const post = await ApiContainer.cradle.post.ep.create({
    ...postDto,
    // TODO add user id from session
    authorId: 1,
   });
 
  return Response.json({ data: post })
}