import {useMemo} from "react";

// Возвращаем результат, обновляемый только при изменении списка вариантов или поиска
// Ищем варианты с вхождением поискового запроса в name у варианта
export function useSearchedOptions(options, search) {
    return useMemo(() => {
        return options.filter(opt => opt.name.toLowerCase().includes(search.toLowerCase()));
    }, [options, search]);
}

// Возвращаем результат, обновляемые только при изменении результата прошлой функции или выбранных постой
// Ищем варианты, которых нет среди выбранных
export function useUnselectedSearchedOptions(options, search, selected) {
    const searchedOptions = useSearchedOptions(options, search);
    return useMemo(() => {
        return searchedOptions.filter(opt => !selected.map(sel => sel.value).includes(opt.value));
    }, [searchedOptions, selected]);
}