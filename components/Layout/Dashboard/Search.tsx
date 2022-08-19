import { Card, Modal, TextInput } from "@mantine/core"
import { Auth, IconSearch } from "@supabase/ui"
import Empty from "components/Common/Empty"
import LinkPreview from "components/Common/LinkPreview"
import { useSupabaseClient } from "lib/supabase"
import React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useQuery } from "react-query"


export default function Search() {
    const [open, setOpen] = React.useState(false)
    useHotkeys('/', () => setOpen(true))
    const supabase = useSupabaseClient()
    const { user } = Auth.useUser()
    const [searchText, setSearchText] = React.useState<string | null>()
    const search = async () => {
        const response = await supabase.rpc('search_links', { keyword: searchText?.replaceAll(" ", " | "), u: user?.id })
        return response.data || []
    }

    const { data } = useQuery(["searchLinks", searchText], search, {
        enabled: Boolean(searchText),
    })

    return (
        <Modal
            opened={open}
            onClose={() => setOpen(false)}
            size="55%"
            withCloseButton={false}
        >
            <div>
                <TextInput
                    value={searchText || ''}
                    onChange={(e) => setSearchText(e.target.value)}
                    icon={<IconSearch size={16} />}
                    placeholder="Search for a link..."
                />
            </div>
            <div>
                {
                    data && data.length === 0 && <Empty text="No results found" />
                }
                {
                    data && data.length > 0 && data.map((link, index) => (
                        <Card
                            my="md"
                            key={index}
                        >
                            <LinkPreview data={link} />
                        </Card>
                    ))
                }
            </div>
        </Modal>
    )
}

