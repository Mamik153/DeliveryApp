import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const client = sanityClient({
    projectId: 'l5ajxhib',
    dataset: "production",
    useCdn: true,
    apiVersion: '2022-08-13'
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;