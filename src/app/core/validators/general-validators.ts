import { AbstractControl, ValidationErrors } from "@angular/forms";

export function wordsValidator(minWords: number, minChars: number): (control: AbstractControl) => null | ValidationErrors {
    return (control: AbstractControl) => {
        if (!control) return null;
        if (!control.value) return null;
        if (typeof(control.value) !== 'string') return null;
    
        let words = control.value
            .split(' ')
            .filter(word => word);
    let chars = words.join('');
        if (words.length >= minWords && chars.length >= minChars) return null;
    
        return {
            'words': {
                actual: words.length, 
                minimum: minWords
            },
            'chars': {
                actual: chars.length, 
                minimum: minChars
            }
        }    
    }
}