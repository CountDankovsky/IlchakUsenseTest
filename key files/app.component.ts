import { AfterViewInit, Component, ElementRef } from '@angular/core';
     
@Component({
    selector: 'my-app',

    //input as default type for clearier demonstration 

    template: `
    			<div class="container">
				    <div class="field col-md-4 col-md-offset-4">
					    <h1>Password Tester</h1>
					    <input placeholder="type here" id="passentry" class="passinput" maxlength="36">
					    <div class="row lamps">
					    	<div class="col-md-4">
					    		<span class="checkbut" id="le1"></span>
					    	</div>
					    	<div class="col-md-4">
					    		<a class="checkbut" id="le2"></a>
					    	</div>
					    	<div class="col-md-4">
					    		<a class="checkbut" id="le3"></a>
					    	</div>
					    </div>
				    </div>
				</div>`,
    styles: [`
    	.field{border: solid black; margin-top: 15%; background-color: white}
    	h1{text-align:center}
    	input{width:100%}
    	.checkbut
    		{
				background: #b8b8cb;
				padding: 10px 30px;
				display: block;
				color: #fff;
				border-radius: 40px;
				margin: 20px auto;
    		}
    `],
})
export class AppComponent {
	constructor(private elementRef:ElementRef) {
	}
	ngAfterViewInit() {

		let timeout;

		//lightnings declaration

	    let password = <HTMLInputElement>document.getElementById('passentry')
	    let strW = <HTMLInputElement>document.getElementById('le1')
	    let strM = <HTMLInputElement>document.getElementById('le2')
	    let strS = <HTMLInputElement>document.getElementById('le3')

	    //password levels declaration

		let TopPass = new RegExp('(?=.*[0-9])((?=.*[A-Za-z]))(?=.*[^A-Za-z0-9])(?=.{8,})')
		let MedPass = new RegExp('(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])(?=.{8,})|(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})|(?=.*[0-9])(?=.*[A-Za-z])(?=.{8,})')
	    let WekPass = new RegExp('(?=.{8,})')

	    //password's checker function

	    function PassChecker(PasswordStrenght){
        if(TopPass.test(PasswordStrenght)) {
        	strW.style.backgroundColor = "#06f84f"
        	strM.style.backgroundColor = "#06f84f"
        	strS.style.backgroundColor = "#06f84f"
        } else if(MedPass.test(PasswordStrenght)){
        	strW.style.backgroundColor = "#ecfd08"
        	strM.style.backgroundColor = "#ecfd08"
        	strS.style.backgroundColor = "#b8b8cb"
        } else if(WekPass.test(PasswordStrenght)){
        	strW.style.backgroundColor = "#f42f3f"
        	strM.style.backgroundColor = "#b8b8cb"
        	strS.style.backgroundColor = "#b8b8cb"
        }
    }
    	//input listener

    	this.elementRef.nativeElement.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => PassChecker(password.value), 500);

        //unsatisfactory input

        if(password.value.length < 1){
            strW.style.backgroundColor = "#b8b8cb"
        	strM.style.backgroundColor = "#b8b8cb"
        	strS.style.backgroundColor = "#b8b8cb"
        } else if (password.value.length < 8)	 {
        	strW.style.backgroundColor = "#f42f3f"
        	strM.style.backgroundColor = "#f42f3f"
        	strS.style.backgroundColor = "#f42f3f"
        }	
  		});
  	}
}