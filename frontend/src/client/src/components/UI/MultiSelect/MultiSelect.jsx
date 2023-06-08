import React, {useEffect, useRef, useState} from 'react';
import cl from "./MultiSelect.module.css";
import {useUnselectedSearchedOptions} from "./hooks";

const MultiSelect = ({name, label, options, selected, setSelected, group=false}) => {
    const [text, setText] = useState("");

    const unselectedSearchedOptions = useUnselectedSearchedOptions(options, text, selected);
    const [optionsIsOpened, setOptionsIsOpened] = useState(false);

    const optionsRef = useRef();
    const inputRef = useRef();
    useEffect(() => {
        document.body.addEventListener('click', (event) => {

            if (optionsRef.current != event.target && inputRef.current != event.target) {
                setOptionsIsOpened(false);
            } else {
            }
        });
    }, []);

    const addSelected = opt => {
        setSelected([...selected, opt]);
        setText("");
    }

    const removeSelected = sel => {
        setSelected(selected.filter(s => s.value !== sel.value));
    }

    return (
            <div className={(group ? cl.MultiSelectGroup : "") + " " + cl.MultiSelectContainer}>
                {
                    label && <label className={cl.MultiSelectLabel} htmlFor={name}>{label}</label>
                }
                <div className={cl.MultiSelect}>
                    {
                        selected.map(sel =>
                            <div className={cl.MultiSelectOption} key={sel.value}><span className={cl.MultiSelectOption}>{sel.name}</span> <span className={cl.MultiSelectOptionCancel} onClick={() => removeSelected(sel)}>×</span></div>
                        )
                    }
                    <input ref={inputRef} onClick={_ => setOptionsIsOpened(true)} name={name} type="text" value={text} onChange={e => {setText(e.target.value); setOptionsIsOpened(true)}}/>
                </div>

                <div ref={optionsRef} className={cl.MultiSelectOptions + " " + ((optionsIsOpened && unselectedSearchedOptions.length) && cl.MultiSelectOpenedOptions)}>
                    <ul>
                        {
                            unselectedSearchedOptions.map(opt =>
                                <li onClick={() => addSelected(opt)} key={opt.value}>{ opt.name }</li>
                            )
                        }
                    </ul>
                </div>


            </div>
    );
};

export default MultiSelect;