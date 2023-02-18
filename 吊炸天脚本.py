import os
import re
from tkinter import filedialog


srcpath:str = filedialog.askdirectory(title='请选择项目路径的src文件夹')
# srcpath:str = 'D:/test/1/src'
output:str = str(input('请输入输出文件夹名称(“src2”)'))
# output:str = 'src2'

transLog = []

class Bundle:
  def __init__(self, pre, rep):
      self.pre = pre
      self.rep = rep


def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        pass
 
    try:
        import unicodedata
        unicodedata.numeric(s)
        return True
    except (TypeError, ValueError):
        pass
 
    return False


def resolveExpress(exp:str, data):
    expression = ''
    hasArgs = False
    operation = ''
    if(re.findall(r'[(].+[)]', exp)):
        hasArgs = True
    if(hasArgs):
      operation = exp.split('(')[0]
      expression = expression + operation + '(' + data

      args = re.findall(r"[(](.*?)[)]", exp)[0].split(',')
      for each in args:
          arg = each if(is_number(each))  else each * 1
          expression = expression + ', ' + arg
    else:
      operation = exp
      expression = expression + operation + '(' + data
    expression += ')'
    return expression
    
def findFilter(string:str):
    lines = re.findall(r'{{.+?}}', string)
    bundle = []
    for each in lines:
        block = re.findall(r'.+[ ]*[^|][|][^|][ ]*.+', each)  #在C神的帮助下完成了正则匹配
        for item in block:
            if(each):
                raw = re.split(r'[ ]*[|][ ]*', item[2:-2]) 
                bundle.append(Bundle(item[2:-2], resolveExpress(raw[1], raw[0])))
    return bundle

def readFile(path:str):
    with open(path, mode='r', encoding='utf-8') as f:
        file = f.read()
        result = re.findall(r'<template>.+</template>', file, re.DOTALL)
        for each in result:
            exectuation = findFilter(each)
            if(exectuation):
              for item in exectuation:
                  file = file.replace(item.pre, item.rep)
                  transLog.append(item.pre + '---->' + item.rep)

        dirname = os.path.dirname(os.path.abspath(path)).replace('src', output)
        pathname = path.replace('src', output)
        if(os.path.exists(dirname)):
            with open(pathname, mode='w', encoding='utf-8')as resolveFile:
                resolveFile.write(file)
                resolveFile.close()
        else:
            os.makedirs(dirname)
            with open(pathname, mode='w', encoding='utf-8')as resolveFile:
                resolveFile.write(file)
                resolveFile.close()
        print(pathname + '解析成功')
def __main__():
    for root, dirs, files in os.walk(srcpath):
        for each in files:
            file_path:str = os.path.join(root, each)
            if(file_path.endswith('.vue')):
              try:
                readFile(file_path)
              except Exception as e:
                print(file_path + '解析失败')
                print(e)
    with open(srcpath.replace('src', output) + '/trans.log', mode='w', encoding='utf-8')as f:
        for lines in transLog:
            f.write(lines + '\n')
        f.close()

if(not os.path.exists(srcpath.replace('src', output))):
    os.mkdir(srcpath.replace('src', output))

__main__()