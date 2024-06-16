 export default  {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    backendAPI : process.env.NEXT_PUBLIC_API
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    
  },
}