import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
 name: 'mattDamon'
})
export class MattDamon {
    
    constructor(private sanitizer: DomSanitizer) {
    }
    
    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}