import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ItemsManager from "./ItemsManager";

export default function TooManyItemsPlus() {
    const {t} = useTranslation();
    const [data, setData] = useState<Record<string, Record<string, string>>>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('./misc/toomanyitemsplus.json');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Failed to load items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ItemsManager
            dataSource={data}
            isLoading={isLoading}
            filterCategories={[
                "itemlist_beta",
                "itemlist_event",
                "itemlist_follower",
                "itemlist_rot",
                "itemlist_natural",
                "itemlist_sculpture",
                "itemlist_puppet",
                "itemlist_boss",
                "itemlist_den",
                "itemlist_ruins",
                "itemlist_building"
            ]}
            warningMessage={t('tooManyItems.warningMessage')}
        />
    );
}