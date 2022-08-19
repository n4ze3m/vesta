import { Card, Kbd, Modal, TextInput } from "@mantine/core"
import { Auth, IconSearch } from "@supabase/ui"
import Empty from "components/Common/Empty"
import LinkPreview from "components/Common/LinkPreview"
import { useSupabaseClient } from "lib/supabase"
import React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useQuery } from "react-query"


interface ISearchProps {
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
}

export default function Search(
    { open, onOpen, onClose }: ISearchProps
) {
    const rightSection = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Kbd>/</Kbd>
        </div>
    );
    useHotkeys('/', () => onOpen())
    const supabase = useSupabaseClient()
    const { user } = Auth.useUser()
    const [searchText, setSearchText] = React.useState<string | null>()
    const search = async () => {
        const response = await supabase.rpc('search_links', { keyword: searchText?.trim().replaceAll(" ", " | "), u: user?.id })
        return response.data || []
    }

    const { data } = useQuery(["searchLinks", searchText], search, {
        enabled: Boolean(searchText),
    })

    return (
        <Modal
            opened={open}
            onClose={() => onClose()}
            size="lg"
            withCloseButton={false}
        >
            <div>
                <TextInput
                    value={searchText || ''}
                    onChange={(e) => setSearchText(e.target.value)}
                    icon={<IconSearch size={16} />}
                    placeholder="Search for a link..."
                    rightSectionWidth={90}
                    rightSection={rightSection}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
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

