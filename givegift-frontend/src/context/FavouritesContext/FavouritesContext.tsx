import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { IFavProduct, Tag } from "../../types"
import { useFetching } from "../../hooks/useFetching"
import { useSupabase } from "../SupabaseContext/SupabaseContext"
import FavouritesService from "../../API/FavouritesService"

// There is no need for userID in these functions because it is already stored in the context
interface FavouritesContextType {
    addToFavourites: (favProduct: Omit<IFavProduct, "userID">) => Promise<void>
    removeFromFavourites: (favProduct: Omit<IFavProduct, "userID">) => Promise<void>
    editFavouritesTag: (favProduct: Omit<IFavProduct, "userID">, newTag: Tag) => Promise<void>
    fetchUserFavourites: () => Promise<void>
    isUserFavouritesLoading: boolean
    userFavouritesError: string
    allUserFavourites: IFavProduct[]
    allUserTags: Tag[]
}

export const FavouritesContext = createContext<FavouritesContextType | null>(null)

export const FavouritesContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { session } = useSupabase()
    const userID = session?.user.id
    const [allUserFavourites, setAllUserFavourites] = useState<IFavProduct[]>([])

    const [fetchUserFavourites, isUserFavouritesLoading, userFavouritesError] = useFetching(async () => {
        if (!userID) throw new Error("No user logged in")
        const resp = await FavouritesService.fetchUserFavourites(userID)
        setAllUserFavourites(resp.data)
    })

    const [addToFavourites, ,] = useFetching(async (favProduct: Omit<IFavProduct, "userID">) => {
        if (!userID) throw new Error("No user logged in")
        await FavouritesService.addToFavourites({ ...favProduct, userID })
        await fetchUserFavourites()
    })

    const [removeFromFavourites, ,] = useFetching(async (favProduct: Omit<IFavProduct, "userID">) => {
        if (!userID) throw new Error("No user logged in")
        await FavouritesService.removeFromFavourites({ ...favProduct, userID })
        await fetchUserFavourites()
    })

    const [editFavouritesTag, ,] = useFetching(
        async (favProduct: Omit<IFavProduct, "userID">, newTag: Tag) => {
            if (!userID) throw new Error("No user logged in")
            await FavouritesService.editFavouritesTag({ ...favProduct, userID }, newTag)
            await fetchUserFavourites()
        }
    )

    const allUserTags = useMemo(() => {
        const tags = new Set<Tag>();
        allUserFavourites.forEach(({ tag }) => tag && tags.add(tag));
        return [...tags];
    }, [allUserFavourites]);


    useEffect(() => {
        if (userID) {
            fetchUserFavourites().catch(console.error)
        }
    }, [userID])

    const value: FavouritesContextType = {
        addToFavourites,
        removeFromFavourites,
        editFavouritesTag,
        fetchUserFavourites,
        isUserFavouritesLoading,
        userFavouritesError,
        allUserFavourites,
        allUserTags
    }

    return (
        <FavouritesContext.Provider value={value}>
            {children}
        </FavouritesContext.Provider>
    )
}

export function useFavourites() {
    const ctx = useContext(FavouritesContext)
    if (!ctx) {
        throw new Error(
            "useFavourites must be used within an FavouritesContextProvider"
        )
    }
    return ctx
}
