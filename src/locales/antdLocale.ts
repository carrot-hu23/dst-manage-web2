import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import jaJP from 'antd/es/locale/ja_JP';
import koKR from 'antd/es/locale/ko_KR';
import esES from 'antd/es/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/es';
import {enUSIntl, jaJPIntl, koKRIntl, esESIntl, zhCNIntl} from '@ant-design/pro-components';

// Maps this app's i18next language codes to antd's own locale objects, so
// antd/pro-components built-in strings (default placeholders, pagination,
// Popconfirm text, etc.) follow the selected language instead of silently
// falling back to pro-components' own default (Chinese).
const antdLocales = {
    zh: zhCN,
    en: enUS,
    jp: jaJP,
    kr: koKR,
    es: esES,
};

const dayjsLocales = {
    zh: 'zh-cn',
    en: 'en',
    jp: 'ja',
    kr: 'ko',
    es: 'es',
};

export function getAntdLocale(language: string) {
    return antdLocales[language as keyof typeof antdLocales] || enUS;
}

export function syncDayjsLocale(language: string) {
    dayjs.locale(dayjsLocales[language as keyof typeof dayjsLocales] || 'en');
}

// pro-components (ProTable/ProForm search forms, etc.) resolves its own
// built-in strings (placeholders, reset/search button text) through a
// separate ProConfigProvider "intl" context rather than antd's own
// ConfigProvider locale. Pages that render pro-components outside of
// ProLayout's own ProConfigProvider need to pass this explicitly -- see
// getProIntl usage in PlayerLog/Dashboard/DstServerList.
const proIntls = {
    zh: zhCNIntl,
    en: enUSIntl,
    jp: jaJPIntl,
    kr: koKRIntl,
    es: esESIntl,
};

export function getProIntl(language: string) {
    return proIntls[language as keyof typeof proIntls] || enUSIntl;
}
