const fs=require('fs');
const path=require('path');
var command=process.argv.slice(2);
var commands=[['-s','<<'],['-s','-b','<<'],['-b','-s','<<'],['-n','<<'],['-b','<<'],
    ['-s','<<'],['s','n','<<'],['n','s','<<'],['-s','<'],['-s','-b','<'],['-b','-s','<'],
    ['-n','<'],['-b','<'],['-s','<'],['s','n','<'],['n','s','<'],['-s','-b'],['-b','-s'],
    ['-s','-n'],['-n','-s'],['-s'],['-n'],['-b']]
var c=0;
//console.log(command)
var isThisFile=isFile(command.slice(1));
//console.log("file hai bhi k nhi "+ isThisFile);
if(isThisFile){
    readFile(command.slice(1));
}else{
    for(var i=0;i<commands.length;i++){
          var count=0;
        for(var j=0;j<commands[i].length;j++){
            var flag=false;
            for(var k=1;k<command.length;k++){
                 if(commands[i][j]==command[k]){
                     flag=true;
                     break;
                 }
            }
            if(flag){
                count++;
            }else{
                break;
            }
        }
        if(count==commands[i].length){
            c=i+1;
            break;
        }
    }
}
//console.log("c is : "+ c);

switch(c){
    case 17:
        files=getFile(commands[c-1],command);
        data=getData(files);
      //  console.log("files : "+ files);
        data=RemoveBackSpaceModified(data);
        data=HandleNumberingModified(data);
        displayData(data);
        break;
    case 18:
        files=getFile(commands[c-1],command);
        data=getData(files);
        data=RemoveBackSpaceModified(data);
        data=HandleNumberingModified(data);
        displayData(data);
        break;
    case 19:
        files=getFile(commands[c-1],command);
        data=getData(files);
        data=RemoveBackSpaceModified(data);
        data=HandleNumberingAllModified(data);
        displayData(data);
        break;
    case 20:
        files=getFile(commands[c-1],command);
        data=getData(files);
        data=RemoveBackSpaceModified(data);
        data=HandleNumberingAllModified(data);
        displayData(data);
        break;
    case 21:
        files=getFile(commands[c-1],command);
        RemoveBackSpace(files);
        break;
    case 22:
        files=getFile(commands[c-1],command);
        HandleNumberingsAll(files);
        break;
    case 23:
        files=getFile(commands[c-1],command);
        HandleNumbering(files);
        break;
}

function HandleNumbering(files){
   // console.log(dirPath);
   // console.log("-b function called");
    files.forEach(function(file){
        if(fs.existsSync(file)){
            var data=fs.readFileSync(file)+"";
            lines=data.split(/\r?\n/);
            var count=0;
            lines.forEach(function(line){
             //   console.log("size of line is : "+ line.length);
                if(line.length>0){
                    console.log(++count+" "+line);
                }else{
                    console.log(line);
                }
                
            })
        }else{
            console.log("please enter correct file path");
            return;
        }
    })
}
function HandleNumberingsAll(files){
    files.forEach(function(file){
        if(fs.existsSync(file)){
            var data=fs.readFileSync(file)+"";
            lines=data.split(/\r?\n/);
            var count=0;
            lines.forEach(function(line){
             //   console.log("size of line is : "+ line.length);
                console.log(++count+" "+line);
            })
        }else{
            console.log("please enter correct file path");
            return;
        }
    })
   // console.log("dirpath : "+ dirPath);
   // console.log("-n function called");
}
function RemoveBackSpace(files){
    for(var i=0;i<files.length;i++){
         if(!fs.existsSync(files[i])){
             console.log("please enter correct file path");
             return;
         }else{
             var data=fs.readFileSync(files[i])+"";
             const lines = data.split(/\r?\n/);
             var bs=0;
             for(var i=0;i<lines.length;i++){
                 if(lines[i].length>0){
                     console.log(lines[i]);
                     bs=0;
                 }else{
                     if(bs==0){
                         console.log(lines[i]);
                         bs+=1;
                     }else{
                         bs+=1;
                     }
                 }
             }
         }
    }
}
function readFile(files){
  //  console.log("readFile mein hain");
    files.forEach(function(file){
    //     console.log("file is " +file);
        fs.readFile(file,function(err,data){
            if(err){
                console.log("No file exists");
            }else{
        //        console.log("read file k else mein hain");
                console.log(""+data);
            }
        })
      
    })
}
function isFile(files){
    for(var i=0;i<files.length;i++){
        if(!fs.existsSync(files[i])){
            return false;
        }
        if(!fs.lstatSync(files[i]).isFile()){
            return false;
        }
    }
    return true;
}

function getFile(actual_command,given_command){
    var fileNames=[];
    for(var i=1;i<given_command.length;i++){
        var flag=false;
        for(var j=0;j<actual_command.length;j++){
            if(given_command[i]==actual_command[j]){
                flag=true;
                break;
            }
        }
        if(!flag){
           fileNames.push(given_command[i]);
        }
    }
 //   console.log("actual_command : "+ actual_command);
 //   console.log("given_command : "+ given_command);
 //   console.log("fileNames : "+ fileNames);
    return fileNames;
}

function HandleNumberingAllModified(data){
    var ans=[];
    for(var j=0;j<data.length;j++){
        var count=0;
        var temp=[];
        for(var i=0;i<data[j].length;i++){
            temp.push(++count+" "+data[j][i]);
       }
       ans.push(temp);
    }
    return ans;

}

function HandleNumberingModified(data){
    var ans=[];
    for(var j=0;j<data.length;j++){
        var count=0;
        var temp=[]
        for(var i=0;i<data[j].length;i++){
            if(data[j][i].length>0){
                temp.push(++count+" "+data[j][i]);
            }else{
                temp.push(data[j][i]);
            }
        }
        ans.push(temp);
    }
    return ans;
}

function RemoveBackSpaceModified(data){
    var ans=[];
    
    for(var j=0;j<data.length;j++){
        var b=0;
        var temp=[];
        for(var i=0;i<data[j].length;i++){
            if(data[j][i].length>0){
                temp.push(data[j][i]);
                b=0;
            }else{
                if(b==1){
                    temp.push(data[j][i]);
                }
                b++;
            }
      }
      ans.push(temp);
    }
    return ans;
}

function getData(files){
    var ans=[];
    for(var i=0;i<files.length;i++){
        if(!fs.existsSync(files[i])){
            return ans;
        }
        if(!fs.lstatSync(files[i]).isFile()){
            return ans;
        }
        data=fs.readFileSync(files[i])+"";
        lines=data.split(/\r?\n/);
        ans.push(lines);
    }
    return ans;
}

function displayData(data){
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data[i].length;j++){
            console.log(data[i][j]);
        }
    }
}