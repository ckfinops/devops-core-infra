import { Component } from '@angular/core';

@Component({
  selector: 'app-da-pandas-basics',
  templateUrl: './da-pandas-basics.component.html',
  styleUrls:['../blog-template.component.css']
})
export class DaPandasBasicsComponent {
  // copyCode(event: any) { 
  //   const code = event.target.previousElementSibling.innerText; 
  //   navigator.clipboard.writeText(code).then(() => {
  //     const button = event.target; 
  //     button.innerText = 'Copied!'; 
  //     setTimeout(() => { 
  //       button.innerText = 'Copy'; 
  //     }, 2000); 
  //   }); 
  // }

  async copyCode(event: any): Promise<void> { 
    // const codeContent = document.getElementById('code-content')!.innerText; 
    try { 
      const button = event.target; 
      const preElement = button.closest('.code-container')!.querySelector('pre')!; 
      const codeContent = preElement.innerText
      await navigator.clipboard.writeText(codeContent); 
      button.innerText = 'Copied!'; 
      setTimeout(() => { 
              button.innerText = 'Copy'; 
            }, 2000); 
    } catch (err) { 
      console.error('Failed to copy: ', err); 
      alert('Failed to copy the code.'); 
    } 
  }
}
