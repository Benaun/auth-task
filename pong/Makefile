CC = gcc
CFLAGS = -Wall -Wextra -Werror -std=c11
TARGET = pong

all: $(TARGET)

$(TARGET): main.c
	$(CC) $(CFLAGS) main.c -o $(TARGET)

clean:
	rm -f $(TARGET)
