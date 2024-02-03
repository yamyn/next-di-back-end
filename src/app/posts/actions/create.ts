'use server'

import ApiContainer from "@/modules/index";

 
export async function createPost(formData: FormData) {
    await ApiContainer.cradle.post.ep.create({
        title: formData.get('title'),
        content: formData.get('content'),
        // TODO add user id from session
        authorId: 1,
    });
}