import { RouterProvider } from "react-router-dom";
import QueryProvider from "./provider/query-Provider";
import { router } from "./routers";


export default function App () {
    return (
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
    )

}