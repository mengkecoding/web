# Java基本语法
## Java命名规则
- 类名：首字母大写，后面每个单词首字母大写，如：HelloWorld
- 方法名：首字母小写，后面每个单词首字母大写，如：helloWorld
- 变量名：首字母小写，后面每个单词首字母大写，如：helloWorld
- 常量名：全部大写，单词之间用下划线分隔，如：HELLO_WORLD
## Java运算符
- 算术运算符：+，-，*，/，%，++，--
- 赋值运算符：=，+=，-=，*=，/=，%=
- 比较运算符：==，!=，>，<，>=，<=
- 逻辑运算符：&&，||，!
- 位运算符：&，|，^，~，<<，>>，>>>
- 条件运算符：?:
# Java常用类
## Scanner类
- Scanner类是Java中常用的输入类，它可以从标准输入、文件、字符串等读取数据。
### 方法
- next()：读取下一个字符串
- nextLine()：读取下一行字符串
- nextInt()：读取下一个整数
- nextDouble()：读取下一个浮点数
- nextBoolean()：读取下一个布尔值
- hasNext()：判断是否还有下一个字符串
- hasNextInt()：判断是否还有下一个整数
- hasNextDouble()：判断是否还有下一个浮点数
- hasNextBoolean()：判断是否还有下一个布尔值
**示例**
```java
Scanner scanner = new Scanner(System.in);  // 创建一个Scanner对象，从标准输入读取数据
System.out.println("请输入一个字符串：");   // 输出提示信息
String str = scanner.next();              // 读取下一个字符串
System.out.println("您输入的字符串是：" + str); // 输出读取到的字符串
``` 
## Object类
- Object类是Java中所有类的父类，它提供了一些常用的方法。
### 方法
- equals()：比较两个对象是否相等
- hashCode()：返回哈希码
- toString()：返回对象的字符串表示
- clone()：创建并返回对象的副本
- finalize()：当对象被垃圾回收时调用
- getClass()：返回对象的类
- notify()：唤醒等待该对象的线程
- notifyAll()：唤醒所有等待该对象的线程
- wait()：使当前线程等待
- wait(long timeout)：使当前线程等待指定的时间
- wait(long timeout, int nanos)：使当前线程等待指定的时间
**示例**
```java
Object obj = new Object();  // 创建一个Object对象
System.out.println(obj.toString()); // 输出对象的字符串表示
System.out.println(obj.hashCode()); // 输出对象的哈希码
System.out.println(obj.equals(new Object())); // 比较两个对象是否相等
``` 

## Number类
### 子类
- Integer类：表示整数
- Double类：表示浮点数
- Float类：表示浮点数
- Long类：表示长整数
- Short类：表示短整数
- Byte类：表示字节
- BigInteger类：表示大整数
- BigDecimal类：表示大浮点数
### 方法
- byteValue()：返回byte类型的值
- shortValue()：返回short类型的值
- intValue()：返回int类型的值
- longValue()：返回long类型的值
- floatValue()：返回float类型的值
- doubleValue()：返回double类型的值
- toString()：返回字符串表示的值
- equals()：比较两个Number对象是否相等
- hashCode()：返回哈希码
- compareTo()：比较两个Number对象的大小
- compare()：比较两个Number对象的大小
**示例**
```java
Number number = 10;
System.out.println(number.intValue()); // 10
System.out.println(number.toString()); // 10
System.out.println(number.equals(10)); // true
System.out.println(number.hashCode()); // 10
System.out.println(number.compareTo(10)); // 0
System.out.println(number.compare(10, 20)); // -1
```
## Math类
- Math类是Java中常用的数学类，它提供了很多数学方法。
### 方法
- abs()：返回绝对值
- cbrt()：返回立方根
- ceil()：返回大于等于参数的最小整数
- cos()：返回余弦值
- exp()：返回指数函数
- floor()：返回小于等于参数的最大整数
- log()：返回自然对数
- log10()：返回以10为底的对数
- pow()：返回幂
- random()：返回0.0到1.0之间的随机数
- round()：返回四舍五入的值
- sin()：返回正弦值
- sqrt()：返回平方根
- tan()：返回正切值
- max()：返回两个参数的最大值
- min()：返回两个参数的最小值
示例
```java
System.out.println(Math.abs(-10)); // 10
System.out.println(Math.cbrt(27)); // 3.0
System.out.println(Math.ceil(3.14)); // 4.0
System.out.println(Math.cos(0)); // 1.0
System.out.println(Math.exp(1)); // 2.718281828459045
System.out.println(Math.floor(3.14)); // 3.0
System.out.println(Math.log(10)); // 2.302585092994046
System.out.println(Math.log10(100)); // 2.0
System.out.println(Math.pow(2, 3)); // 8.0
System.out.println(Math.random()); // 0.0到1.0之间的随机数
System.out.println(Math.round(3.14)); // 3
System.out.println(Math.sin(0)); // 0.0
System.out.println(Math.sqrt(4)); // 2.0
System.out.println(Math.tan(0)); // 0.0
System.out.println(Math.max(10, 20)); // 20
System.out.println(Math.min(10, 20)); // 10
```
### 常量
- PI：圆周率
- E：自然对数的底数
**示例**
```java
System.out.println(Math.PI); // 3.141592653589793
System.out.println(Math.E); // 2.718281828459045
```
### BigDecimal类
- BigDecimal类是Java中用于高精度计算的类，它提供了很多方法。
#### 方法
- add()：加法
- subtract()：减法
- multiply()：乘法
- divide()：除法
- remainder()：取余
- compareTo()：比较两个BigDecimal对象的大小
- equals()：比较两个BigDecimal对象是否相等
- hashCode()：返回哈希码
- toString()：返回字符串表示的值
**示例**
```java
BigDecimal a = new BigDecimal("10");
BigDecimal b = new BigDecimal("20");
System.out.println(a.add(b)); // 30
System.out.println(a.subtract(b)); // -10
System.out.println(a.multiply(b)); // 200
System.out.println(a.divide(b)); // 0.5
System.out.println(a.remainder(b)); // 10
System.out.println(a.compareTo(b)); // -1
System.out.println(a.equals(b)); // false
System.out.println(a.hashCode()); // 10
System.out.println(a.toString()); // 10
```

## String类
- String类是Java中最常用的类之一，它表示一个字符串。
### 方法
- length()：返回字符串的长度
- charAt()：返回指定索引处的字符
- substring()：返回指定的子字符串
- indexOf()：返回指定字符或子字符串的索引
- lastIndexOf()：返回指定字符或子字符串的最后一个索引
- equals()：比较两个字符串是否相等
- compareTo()：比较两个字符串的大小
- toUpperCase()：将字符串转换为大写
- toLowerCase()：将字符串转换为小写
- trim()：去除字符串两端的空格
- replace()：替换字符串中的字符或子字符串
- split()：将字符串分割成字符串数组
- startsWith()：判断字符串是否以指定的前缀开始
- endsWith()：判断字符串是否以指定的后缀结束
**示例**
```java
String str = "Hello World";
System.out.println(str.length()); // 11
System.out.println(str.charAt(0)); // H
System.out.println(str.substring(0, 5)); // Hello
System.out.println(str.indexOf("o")); // 4
System.out.println(str.lastIndexOf("o")); // 7  
System.out.println(str.equals("Hello World")); // true
System.out.println(str.compareTo("Hello World")); // 0
System.out.println(str.toUpperCase()); // HELLO WORLD
System.out.println(str.toLowerCase()); // hello world
System.out.println(str.trim()); // Hello World
System.out.println(str.replace("o", "a")); // HellA WArld
System.out.println(str.split(" ")[0]); // Hello
System.out.println(str.startsWith("Hello")); // true
System.out.println(str.endsWith("World")); // true
```
### 常量
- EMPTY：空字符串
- NULL：空字符串
- VALUE_OF：将其他类型转换为字符串
**示例**
```java
System.out.println(String.EMPTY); // ""
System.out.println(String.NULL); // ""
System.out.println(String.valueOf(10)); // "10"
```
## StringBuilder类
- StringBuilder类是Java中用于处理可变字符串的类，它提供了很多方法。
### 方法
- append()：追加字符串
- insert()：插入字符串
- delete()：删除字符串
- replace()：替换字符串
- reverse()：反转字符串
- toString()：返回字符串表示的值
- length()：返回字符串的长度
- charAt()：返回指定索引处的字符
- substring()：返回指定的子字符串
- indexOf()：返回指定字符或子字符串的索引
- lastIndexOf()：返回指定字符或子字符串的最后一个索引
- equals()：比较两个字符串是否相等
- compareTo()：比较两个字符串的大小
- toUpperCase()：将字符串转换为大写
- toLowerCase()：将字符串转换为小写
- trim()：去除字符串两端的空格
- replace()：替换字符串中的字符或子字符串
- split()：将字符串分割成字符串数组
- startsWith()：判断字符串是否以指定的前缀开始
- endsWith()：判断字符串是否以指定的后缀结束
**示例**
```java
StringBuilder sb = new StringBuilder("Hello World");    
System.out.println(sb.append("!")); // Hello World!
System.out.println(sb.insert(0, "Hello ")); // Hello Hello World!
System.out.println(sb.delete(0, 6)); // Hello World!
System.out.println(sb.replace(0, 6, "Hello")); // Hello World!
System.out.println(sb.reverse()); // !dlroW olleH
System.out.println(sb.toString()); //!dlroW olleH
System.out.println(sb.length()); // 11
System.out.println(sb.charAt(0)); // !
System.out.println(sb.substring(0, 5)); // Hello
System.out.println(sb.indexOf("o")); // 4
System.out.println(sb.lastIndexOf("o")); // 7
System.out.println(sb.equals("Hello World!")); // true
System.out.println(sb.compareTo("Hello World!")); // 0
System.out.println(sb.toUpperCase()); // HELLO WORLD!
System.out.println(sb.toLowerCase()); // hello world!
System.out.println(sb.trim()); // Hello World!
System.out.println(sb.replace("o", "a")); // HellA WArld!
System.out.println(sb.split(" ")[0]); // Hello
System.out.println(sb.startsWith("Hello")); // true
System.out.println(sb.endsWith("World!")); // true
```
### 常量
- EMPTY：空字符串
- NULL：空字符串
- VALUE_OF：将其他类型转换为字符串
**示例**
```java
System.out.println(StringBuilder.EMPTY); // ""
System.out.println(StringBuilder.NULL); // ""
System.out.println(StringBuilder.VALUE_OF(10)); // "10"
```
## Character类
- Character类是Java中用于处理字符的类，它提供了很多方法。
### 方法
- isDigit()：判断字符是否为数字
- isLetter()：判断字符是否为字母
- isUpperCase()：判断字符是否为大写字母
- isLowerCase()：判断字符是否为小写字母
- toUpperCase()：将字符转换为大写字母
- toLowerCase()：将字符转换为小写字母
- toString()：返回字符的字符串表示
- valueOf()：将其他类型转换为字符
**示例**
```java
char c = 'A';   
System.out.println(Character.isDigit(c)); // false
System.out.println(Character.isLetter(c)); // true
System.out.println(Character.isUpperCase(c)); // true
System.out.println(Character.isLowerCase(c)); // false
System.out.println(Character.toUpperCase(c)); // A
System.out.println(Character.toLowerCase(c)); // a
System.out.println(Character.toString(c)); // A
System.out.println(Character.valueOf(c)); // A
``` 
### 常量
- MIN_VALUE：字符的最小值
- MAX_VALUE：字符的最大值
**示例**
```java
System.out.println(Character.MIN_VALUE); // 0
System.out.println(Character.MAX_VALUE); // 65535
``` 
## Array类
- Array类是Java中用于处理数组的类，它提供了很多方法。
### 方法
- sort()：对数组进行排序
- binarySearch()：在数组中查找指定元素的索引
- equals()：比较两个数组是否相等
- toString()：返回数组的字符串表示
- asList()：将数组转换为列表
**示例**
```java
int[] arr = {1, 2, 3, 4, 5};    
System.out.println(Arrays.sort(arr)); // [1, 2, 3, 4, 5]
System.out.println(Arrays.binarySearch(arr, 3)); // 2
System.out.println(Arrays.equals(arr, new int[]{1, 2, 3, 4, 5})); // true
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 4, 5]
System.out.println(Arrays.asList(arr)); // [1, 2, 3, 4, 5]
```
### 常量
- EMPTY：空数组
- NULL：空数组
- VALUE_OF：将其他类型转换为数组
**示例**
```java
System.out.println(Arrays.EMPTY); // []
System.out.println(Arrays.NULL); // []
System.out.println(Arrays.VALUE_OF(10)); // [10]    
``` 
## Collection类
- Collection类是Java中用于处理集合的类，它提供了很多方法。
### 方法
- add()：添加元素
- remove()：删除元素
- contains()：判断集合中是否包含指定元素
- size()：返回集合的大小
- isEmpty()：判断集合是否为空
- clear()：清空集合
- iterator()：返回迭代器
**示例**
```java
Collection<Integer> collection = new ArrayList<>();
collection.add(1);  
collection.add(2);  
collection.add(3);  
collection.add(4);
collection.add(5);
System.out.println(collection.add(6)); // true
System.out.println(collection.remove(1)); // true
System.out.println(collection.contains(2)); // true
System.out.println(collection.size()); // 5
System.out.println(collection.isEmpty()); // false
System.out.println(collection.clear()); // null
System.out.println(collection.iterator()); // [1, 2, 3, 4, 5]
```
### 常量
- EMPTY：空集合
- NULL：空集合
- VALUE_OF：将其他类型转换为集合
**示例**
```java
System.out.println(Collection.EMPTY); // []
System.out.println(Collection.NULL); // []
System.out.println(Collection.VALUE_OF(10)); // [10]
``` 
## Collections类
- Collections类是Java中用于处理集合的类，它提供了很多方法。
### 方法
- sort()：对集合进行排序
- binarySearch()：在集合中查找指定元素的索引
- equals()：比较两个集合是否相等
- toString()：返回集合的字符串表示
- asList()：将数组转换为列表
**示例**
```java
List<Integer> list = new ArrayList<>();         
list.add(1);    
list.add(2);    
list.add(3);    
list.add(4);
list.add(5);
System.out.println(Collections.sort(list)); // [1, 2, 3, 4, 5]  
System.out.println(Collections.binarySearch(list, 3)); // 2 
System.out.println(Collections.equals(list, new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5)))); // true
System.out.println(Collections.toString(list)); // [1, 2, 3, 4, 5]
System.out.println(Collections.asList(1, 2, 3, 4, 5)); // [1, 2, 3, 4, 5]
```
### 常量
- EMPTY_LIST：空列表
- EMPTY_SET：空集合
- EMPTY_MAP：空映射
- EMPTY_SORTED_MAP：空排序映射
- EMPTY_SORTED_SET：空排序集合
- EMPTY_NAVIGABLE_MAP：空导航映射
- EMPTY_NAVIGABLE_SET：空导航集合
**示例**
```java
System.out.println(Collections.EMPTY_LIST); // []
System.out.println(Collections.EMPTY_SET); // []
System.out.println(Collections.EMPTY_MAP); // {}
System.out.println(Collections.EMPTY_SORTED_MAP); // {}
System.out.println(Collections.EMPTY_SORTED_SET); // []
System.out.println(Collections.EMPTY_NAVIGABLE_MAP); // {}
System.out.println(Collections.EMPTY_NAVIGABLE_SET); // []
```     
## Iterator类
- Iterator类是Java中用于遍历集合的接口。
### 方法
- hasNext()：判断是否还有下一个元素
- next()：返回下一个元素
- remove()：删除当前元素
**示例**
```java
List<String> list = new ArrayList<>();  // 创建一个List集合
list.add("Hello");  // 添加元素 Hello
list.add("World");  // 添加元素 World
Iterator<String> iterator = list.iterator();  // 获取迭代器
while (iterator.hasNext()) {  // 判断是否还有下一个元素
    String str = iterator.next();  // 获取下一个元素
    System.out.println(str);  // 输出元素
}   
```
## Exception类
- Exception类是Java中所有异常类的父类。
### 方法
- getMessage()：返回异常信息
- getStackTrace()：返回异常的堆栈跟踪信息
- printStackTrace()：打印异常的堆栈跟踪信息
- toString()：返回异常的字符串表示
**示例**
```java
try {  // 尝试执行以下代码
    int a = 10;  // 定义一个变量a，并赋值为10
    int b = 0;  // 定义一个变量b，并赋值为0
    int c = a / b;  // 计算a除以b的值
} catch (Exception e) {  // 如果发生异常，则执行以下代码
    System.out.println(e.getMessage());  // 输出异常信息
    System.out.println(e.getStackTrace());  // 输出异常的堆栈跟踪信息
    e.printStackTrace();  // 打印异常的堆栈跟踪信息
    System.out.println(e.toString());  // 输出异常的字符串表示
}   
```
# IO流
- IO流是Java中用于输入输出的类。
## 输入流
- InputStream：输入流的基类
- FileInputStream：文件输入流
- ByteArrayInputStream：字节数组输入流
- ObjectInputStream：对象输入流
```java
// 输入流
InputStream inputStream = new FileInputStream("file.txt");  // 创建文件输入流
byte[] buffer = new byte[1024];  // 创建字节数组
int len = inputStream.read(buffer);  // 读取数据到字节数组中
String str = new String(buffer, 0, len);  // 将字节数组转换为字符串
System.out.println(str);  // 输出字符串
inputStream.close();  // 关闭输入流
```
## 输出流
- OutputStream：输出流的基类
- FileOutputStream：文件输出流
- ByteArrayOutputStream：字节数组输出流
- ObjectOutputStream：对象输出流
```java
// 输出流
OutputStream outputStream = new FileOutputStream("file.txt");  // 创建文件输出流
String str = "Hello World";  // 要写入文件的字符串
byte[] buffer = str.getBytes();  // 将字符串转换为字节数组
outputStream.write(buffer);  // 写入字节数组到文件中
outputStream.close();  // 关闭输出流
```
## 字符流
- Reader：字符输入流的基类
- FileReader：文件字符输入流
- BufferedReader：缓冲字符输入流
- Writer：字符输出流的基类
- FileWriter：文件字符输出流
- BufferedWriter：缓冲字符输出流
```java
// 字符流
Reader reader = new FileReader("file.txt");  // 创建文件字符输入流
char[] buffer = new char[1024];  // 创建字符数组
int len = reader.read(buffer);  // 读取数据到字符数组中
String str = new String(buffer, 0, len);  // 将字符数组转换为字符串
System.out.println(str);  // 输出字符串
reader.close();  // 关闭字符输入流
Writer writer = new FileWriter("file.txt");  // 创建文件字符输出流
String str = "Hello World";  // 要写入文件的字符串
writer.write(str);  // 写入字符串到文件中
writer.close();  // 关闭字符输出流
```
## 缓冲流
- BufferedInputStream：缓冲输入流
- BufferedOutputStream：缓冲输出流
```java
// 缓冲流
BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream("file.txt"));  // 创建缓冲输入流
BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream("file.txt"));  // 创建缓冲输出流
bufferedOutputStream.write("Hello World".getBytes());  // 写入数据到缓冲输出流中
byte[] buffer = new byte[1024];  // 创建字节数组
int len = bufferedInputStream.read(buffer);  // 读取数据到字节数组中
String str = new String(buffer, 0, len);  // 将字节数组转换为字符串
System.out.println(str);  // 输出字符串
bufferedInputStream.close();  // 关闭缓冲输入流
bufferedOutputStream.close();  // 关闭缓冲输出流
```
## 转换流
- InputStreamReader：将字节输入流转换为字符输入流
- OutputStreamWriter：将字节输出流转换为字符输出流
```java
// 转换流
InputStreamReader inputStreamReader = new InputStreamReader(new FileInputStream("file.txt"));  // 创建输入流转换流
OutputStreamWriter outputStreamWriter = new OutputStreamWriter(new FileOutputStream("file.txt"));  // 创建输出流转换流
```
## 打印流
- PrintStream：打印字节流
- PrintWriter：打印字符流
```java
// 打印流
PrintStream printStream = new PrintStream(new FileOutputStream("file.txt"));  // 创建打印字节流
PrintWriter printWriter = new PrintWriter(new FileWriter("file.txt"));  // 创建打印字符流
printStream.println("Hello World");  // 输出字符串到文件中
printWriter.println("Hello World");  // 输出字符串到文件中
printStream.close();  // 关闭打印字节流
printWriter.close();  // 关闭打印字符流
``` 
## 数据流
- DataInputStream：数据输入流
- DataOutputStream：数据输出流
```java
// 数据流
DataInputStream dataInputStream = new DataInputStream(new FileInputStream("file.txt"));  // 创建数据输入流
DataOutputStream dataOutputStream = new DataOutputStream(new FileOutputStream("file.txt"));  // 创建数据输出流
dataOutputStream.writeInt(10);  // 写入整数到文件中
dataOutputStream.writeDouble(3.14);  // 写入浮点数到文件中
int num = dataInputStream.readInt();  // 读取整数
double d = dataInputStream.readDouble();  // 读取浮点数
System.out.println(num);  // 输出整数
System.out.println(d);  // 输出浮点数
dataInputStream.close();  // 关闭数据输入流
dataOutputStream.close();  // 关闭数据输出流
```
## 序列化
- Serializable：序列化接口
- ObjectInputStream：对象输入流
- ObjectOutputStream：对象输出流
```java
// 序列化
ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("file.txt"));  // 创建对象输出流
objectOutputStream.writeObject(new Person("Tom", 18));  // 写入对象到文件中
objectOutputStream.close();  // 关闭对象输出流
ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("file.txt"));  // 创建对象输入流
Person person = (Person) objectInputStream.readObject();  // 读取对象
System.out.println(person.getName());  // 输出对象的属性
System.out.println(person.getAge());  // 输出对象的属性
objectInputStream.close();  // 关闭对象输入流
```
## 随机访问文件
- RandomAccessFile：随机访问文件
```java
// 随机访问文件
RandomAccessFile randomAccessFile = new RandomAccessFile("file.txt", "rw");  // 创建随机访问文件
randomAccessFile.writeInt(10);  // 写入整数到文件中
randomAccessFile.writeDouble(3.14);  // 写入浮点数到文件中
randomAccessFile.seek(0);  // 将文件指针移动到文件开头
int num = randomAccessFile.readInt();  // 读取整数
double d = randomAccessFile.readDouble();  // 读取浮点数
System.out.println(num);  // 输出整数
System.out.println(d);  // 输出浮点数
randomAccessFile.close();  // 关闭随机访问文件
```
## 管道流
- PipedInputStream：管道输入流
- PipedOutputStream：管道输出流
```java
// 管道流
PipedInputStream pipedInputStream = new PipedInputStream();  // 创建管道输入流
PipedOutputStream pipedOutputStream = new PipedOutputStream();  // 创建管道输出流
pipedInputStream.connect(pipedOutputStream);  // 将管道输入流和管道输出流连接起来
pipedOutputStream.write("Hello World".getBytes());  // 写入数据到管道输出流中
byte[] buffer = new byte[1024];  // 创建字节数组
int len = pipedInputStream.read(buffer);  // 读取数据到字节数组中
String str = new String(buffer, 0, len);  // 将字节数组转换为字符串
System.out.println(str);  // 输出字符串
pipedInputStream.close();  // 关闭管道输入流
pipedOutputStream.close();  // 关闭管道输出流
```
## 过滤流
- FilterInputStream：过滤输入流
- FilterOutputStream：过滤输出流
```java
// 过滤流
FilterInputStream filterInputStream = new FilterInputStream(new FileInputStream("file.txt"));  // 创建过滤输入流
FilterOutputStream filterOutputStream = new FilterOutputStream(new FileOutputStream("file.txt"));  // 创建过滤输出流
filterOutputStream.write("Hello World".getBytes());  // 写入数据到过滤输出流中
byte[] buffer = new byte[1024];  // 创建字节数组
int len = filterInputStream.read(buffer);  // 读取数据到字节数组中
String str = new String(buffer, 0, len);  // 将字节数组转换为字符串
System.out.println(str);  // 输出字符串
filterInputStream.close();  // 关闭过滤输入流   
filterOutputStream.close();  // 关闭过滤输出流
```
## LocalDate类
- LocalDate：日期类
```java
// LocalDate类
LocalDate localDate = LocalDate.now();  // 获取当前日期
System.out.println(localDate);  // 输出当前日期
System.out.println(localDate.getYear());  // 输出年份
System.out.println(localDate.getMonth());  // 输出月份
System.out.println(localDate.getDayOfMonth());  // 输出日期     
``` 
## LocalTime类
- LocalTime：时间类
```java
// LocalTime类
LocalTime localTime = LocalTime.now();  // 获取当前时间
System.out.println(localTime);  // 输出当前时间
System.out.println(localTime.getHour());  // 输出小时
System.out.println(localTime.getMinute());  // 输出分钟
System.out.println(localTime.getSecond());  // 输出秒
``` 
## LocalDateTime类
- LocalDateTime：日期时间类
```java
// LocalDateTime类
LocalDateTime localDateTime = LocalDateTime.now();  // 获取当前日期时间
System.out.println(localDateTime);  // 输出当前日期时间
System.out.println(localDateTime.getYear());  // 输出年份
System.out.println(localDateTime.getMonth());  // 输出月份
System.out.println(localDateTime.getDayOfMonth());  // 输出日期
System.out.println(localDateTime.getHour());  // 输出小时
System.out.println(localDateTime.getMinute());  // 输出分钟
System.out.println(localDateTime.getSecond());  // 输出秒
``` 
## DateTimeFormatter类
- DateTimeFormatter：日期时间格式化类
```java
// DateTimeFormatter类
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");  // 创建日期时间格式化器
String str = dateTimeFormatter.format(LocalDateTime.now());  // 将日期时间格式化为字符串
System.out.println(str);  // 输出格式化后的字符串
LocalDateTime localDateTime = LocalDateTime.parse(str, dateTimeFormatter);  // 将字符串解析为日期时间
System.out.println(localDateTime);  // 输出解析后的日期时间
``` 
## Duration类
- Duration：时间段类
```java
// Duration类
Duration duration = Duration.between(LocalDateTime.now(), LocalDateTime.now().plusDays(1));  // 获取两个日期时间之间的时间段
System.out.println(duration.toDays());  // 输出时间段的天数
System.out.println(duration.toHours());  // 输出时间段的小时数
System.out.println(duration.toMinutes());  // 输出时间段的分钟数
System.out.println(duration.toSeconds());  // 输出时间段的秒数
``` 
## Period类
- Period：时间段类
```java
// Period类
Period period = Period.between(LocalDate.now(), LocalDate.now().plusDays(1));  // 获取两个日期之间的时间段
System.out.println(period.getYears());  // 输出时间段的年数
System.out.println(period.getMonths());  // 输出时间段的月数
System.out.println(period.getDays());  // 输出时间段的天数
```     
## 正则表达式
- Pattern：正则表达式模式类
- Matcher：正则表达式匹配器类
```java
// 正则表达式
Pattern pattern = Pattern.compile("\\d+");  // 创建正则表达式模式
Matcher matcher = pattern.matcher("12345");  // 创建正则表达式匹配器
System.out.println(matcher.matches());  // 输出匹配结果
System.out.println(matcher.find());  // 输出匹配结果
System.out.println(matcher.group());  // 输出匹配结果
``` 
**规则**
- \d：匹配任意数字
- \w：匹配任意字母、数字、下划线
- \s：匹配任意空白字符
- \D：匹配任意非数字
- \W：匹配任意非字母、数字、下划线
- \S：匹配任意非空白字符
- [abc]：匹配a、b、c中的任意一个字符
- [^abc]：匹配除了a、b、c之外的任意字符
- [a-z]：匹配a到z中的任意一个字符
- [^a-z]：匹配除了a到z之外的任意字符
- .：匹配任意字符
- *：匹配前面的字符0次或多次
- +：匹配前面的字符1次或多次
- ?：匹配前面的字符0次或1次
- {n}：匹配前面的字符n次
- {n,}：匹配前面的字符n次或更多次
- {n,m}：匹配前面的字符n到m次
- |：匹配前面的字符或后面的字符
- ()：分组
- ^：匹配字符串的开头
- $：匹配字符串的结尾
- \：转义字符
- \b：匹配单词边界
- \B：匹配非单词边界
- \A：匹配字符串的开头
- \Z：匹配字符串的结尾
- \G：匹配上一次匹配的结尾
- \z：匹配字符串的结尾
## NIO Files类
### 方法
- readAllBytes()：读取文件的所有字节
- readAllLines()：读取文件的所有行
- write()：写入文件
- copy()：复制文件
- move()：移动文件
- delete()：删除文件
- exists()：判断文件是否存在
- createFile()：创建文件
- createDirectory()：创建目录
- list()：列出目录中的文件
- walk()：遍历目录中的文件
- size()：获取文件的大小
- getLastModifiedTime()：获取文件的最后修改时间
- getOwner()：获取文件的所有者
- getPermissions()：获取文件的权限
- getFileStore()：获取文件的文件存储
- getFileAttributeView()：获取文件的文件属性视图
**示例**
```java
Path path = Paths.get("file.txt");  // 获取文件路径
byte[] bytes = Files.readAllBytes(path);  // 读取文件的所有字节
List<String> lines = Files.readAllLines(path);  // 读取文件的所有行
Files.write(path, "Hello World".getBytes());  // 写入文件
Files.copy(path, Paths.get("file2.txt"));  // 复制文件
Files.move(path, Paths.get("file2.txt"));  // 移动文件
Files.delete(path);  // 删除文件
Files.exists(path);  // 判断文件是否存在
Files.createFile(path);  // 创建文件
Files.createDirectory(path);  // 创建目录
List<Path> paths = Files.list(path).collect(Collectors.toList());  // 列出目录中的文件
Files.walk(path).forEach(System.out::println);  // 遍历目录中的文件
long size = Files.size(path);  // 获取文件的大小
FileTime lastModifiedTime = Files.getLastModifiedTime(path);  // 获取文件的最后修改时间
UserPrincipal owner = Files.getOwner(path);  // 获取文件的所有者
Set<PosixFilePermission> permissions = Files.getPosixFilePermissions(path);  // 获取文件的权限
FileStore fileStore = Files.getFileStore(path);  // 获取文件的文件存储
FileAttributeView fileAttributeView = Files.getFileAttributeView(path, BasicFileAttributeView.class);  // 获取文件的文件属性视图
``` 
## NIO Paths类
### 方法
- get()：获取文件路径
- of()：获取文件路径
- toAbsolutePath()：获取绝对路径
- toRealPath()：获取真实路径
- toUri()：获取URI
- toFile()：获取文件
**示例**
```java
Path path = Paths.get("file.txt");  // 获取文件路径
Path absolutePath = path.toAbsolutePath();  // 获取绝对路径
Path realPath = path.toRealPath();  // 获取真实路径
URI uri = path.toUri();  // 获取URI
File file = path.toFile();  // 获取文件
``` 
# 反射
- 反射是Java中用于在运行时动态获取类的信息和操作类的方法。
## Class类
- Class类是Java中用于描述类的类。
### 方法
- forName()：根据类名获取类
- getClassLoader()：获取类加载器
- getDeclaredFields()：获取所有字段
- getDeclaredMethods()：获取所有方法
- getDeclaredConstructors()：获取所有构造方法
- getDeclaredAnnotation()：获取指定注解
**示例**
```java
Class<?> clazz = Class.forName("java.lang.String");  // 根据类名获取类
ClassLoader classLoader = clazz.getClassLoader();  // 获取类加载器
Field[] fields = clazz.getDeclaredFields();  // 获取所有字段
Method[] methods = clazz.getDeclaredMethods();  // 获取所有方法
Constructor<?>[] constructors = clazz.getDeclaredConstructors();  // 获取所有构造方法
Annotation annotation = clazz.getDeclaredAnnotation(Deprecated.class);  // 获取指定注解
```
### 常量
- TYPE：表示基本类型的Class对象
- VOID：表示void类型的Class对象
- ARRAY：表示数组类型的Class对象
**示例**
```java
Class<?> clazz = Class.forName("java.lang.String");  // 根据类名获取类
Class<?> clazz2 = Class.forName("java.lang.Integer");  // 根据类名获取类
Class<?> clazz3 = Class.forName("java.lang.String[]");  // 根据类名获取类
System.out.println(clazz == clazz2);  // false
System.out.println(clazz == clazz3);  // false
System.out.println(clazz == String.class);  // true
System.out.println(clazz2 == Integer.class);  // true
System.out.println(clazz3 == String[].class);  // true
```
## Field类
- Field类是Java中用于描述字段的类。
### 方法
- getName()：获取字段名
- getType()：获取字段类型
- getModifiers()：获取字段修饰符
- get()：获取字段值
- set()：设置字段值 
**示例**
```java
Class<?> clazz = Class.forName("java.lang.String");  // 根据类名获取类
Field field = clazz.getDeclaredField("value");  // 获取字段
System.out.println(field.getName());  // value
System.out.println(field.getType());  // class [C]
System.out.println(field.getModifiers());  // 17    
``` 
## Method类
- Method类是Java中用于描述方法的类。
### 方法
- getName()：获取方法名
- getReturnType()：获取方法返回类型
- getParameterTypes()：获取方法参数类型
- getModifiers()：获取方法修饰符
- invoke()：调用方法
**示例**
```java
Class<?> clazz = Class.forName("java.lang.String");  // 根据类名获取类
Method method = clazz.getDeclaredMethod("valueOf", char[].class);  // 获取方法
System.out.println(method.getName());  // valueOf
System.out.println(method.getReturnType());  // class java.lang.String
System.out.println(method.getParameterTypes());  // [class [C]  
```     
## Constructor类
- Constructor类是Java中用于描述构造方法的类。
### 方法
- getName()：获取构造方法名
- getParameterTypes()：获取构造方法参数类型
- getModifiers()：获取构造方法修饰符
- newInstance()：创建对象
**示例**
```java
Class<?> clazz = Class.forName("java.lang.String");  // 根据类名获取类
Constructor<?> constructor = clazz.getDeclaredConstructor(char[].class);  // 获取构造方法
System.out.println(constructor.getName());  // valueOf
System.out.println(constructor.getParameterTypes());  // [class [C]
System.out.println(constructor.getModifiers());  // 17
String str = (String) constructor.newInstance(new char[]{'H', 'e', 'l', 'l', 'o'});  // 创建对象
System.out.println(str);  // Hello
``` 
## Annotation类
- Annotation类是Java中用于描述注解的类。
### 方法
- getAnnotation()：获取注解
- getAnnotations()：获取所有注解
- getAnnotationType()：获取注解类型
**示例**
```java
Class<?> clazz = Class.forName("java.lang.String");  // 根据类名获取类
Annotation annotation = clazz.getDeclaredAnnotation(Deprecated.class);  // 获取注解
System.out.println(annotation);  // @java.lang.Deprecated()
Annotation[] annotations = clazz.getDeclaredAnnotations();  // 获取所有注解

System.out.println(annotations);  // EMAILSystem.out.println(annotations);  // [@java.lang.Deprecated()]
Class<?> annotationType = annotation.annotationType();  // 获取注解类型
System.out.println(annotationType);  // class java.lang.Deprecated
```     
## 动态代理
- 动态代理是Java中用于在运行时动态创建代理对象的机制。
### 方法
- Proxy.newProxyInstance()：创建代理对象
**示例**
```java
Class<?> clazz = Class.forName("java.lang.String");  // 根据类名获取类
InvocationHandler handler = new InvocationHandler() {  // 创建InvocationHandler对象
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {  // 实现invoke方法
        System.out.println("before");  // 执行前操作
        Object result = method.invoke(clazz.newInstance(), args);  // 调用方法
        System.out.println("after");  // 执行后操作
        return result;  // 返回结果
    }
};  // 创建InvocationHandler对象
String str = (String) Proxy.newProxyInstance(clazz.getClassLoader(), new Class[]{clazz}, handler);  // 创建代理对象
System.out.println(str);  // Hello
str.length();  // 执行方法
str.equals("Hello");  // 执行方法
```








