import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'json-2-csv';

  jsonContent = ''
  csvContent = ''

  invalidJson = true
  invalidCsv = true

    jsonCsv(){

      var array = typeof this.jsonContent !== 'object' ? JSON.parse(this.jsonContent) : this.jsonContent;
      var str = '';

      if (array.length === 0) {
        return str;
      }
      var headers = Object.keys(array[0]);
      str += headers.join(',') + '\n';

      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line !== '') line += ',';
          line += array[i][index];
        }
        str += line + '\n';
      }

      this.csvContent = str;
      return str;
  }
    csvJson(){

      const lines: string[] = this.csvContent.split("\n");
      const result: object[] = [];
      const headers: string[] = lines[0].split(",");

      for (let i = 1; i < lines.length; i++) {
        const obj: {[key: string]: string} = {};
        const currentline: string[] = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);
      }

      const csvConv: string = JSON.stringify(result);
      this.jsonContent = csvConv
      return csvConv
    }

    downloadCSV(){
      window.open( "data:text/csv;charset=utf-8," + encodeURIComponent(this.csvContent))
    }

    downloadJSON(){
      window.open( "data:text/csv;charset=utf-8," + encodeURIComponent(this.jsonContent))
    }

    copy(value: string, copyBtn: HTMLElement){
      copyBtn.textContent = 'Copied!!!'
      navigator.clipboard.writeText(value)
    }

    clearAll(){
      this.jsonContent = ''
      this.csvContent = ''
      this.invalidJson = true
      this.invalidCsv = true
    }

    validateJSON(){
      try {
        JSON.parse(this.jsonContent);
        this.invalidJson = true
      } catch{
        this.invalidJson = false
      }
    }

    validateCSV(){
      let test = this.csvJson()

      if (this.csvContent === '') {
        this.invalidCsv = false
      }else{
        this.invalidCsv = true
      }

      if(test === '[]'){
        this.invalidCsv = false
      }else{
        this.invalidCsv = true
      }

      this.jsonContent = ''
    }

  }

